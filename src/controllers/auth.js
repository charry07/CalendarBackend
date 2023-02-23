const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('./jwt');
const jwt = require('jsonwebtoken');

const registerController = async (request, reply) => {
  const { password, email, name } = request.body;
  const UserCreated = new User(request.body);
  //encriptar constraseña
  const salt = bcryptjs.genSaltSync();
  UserCreated.password = bcryptjs.hashSync(password, salt);
  //verifica si el usuario ya existe
  const findUser = await User.findOne({ email });
  if (findUser) return reply.status(400).send({ message: 'El usuario ya existe' });

  try {
    await UserCreated.save();
    const token = await generateJWT(UserCreated.id, UserCreated.name);
    password && email && name
      ? reply.status(201).send({ message: 'Register Successfully', user: { uid: UserCreated.id, name: UserCreated.name }, token })
      : reply.status(400).send({ message: 'Error verifica el email y la contrasena' });
  } catch (error) {
    reply.status(500).send({ Error: error.message });
  }
};

const loginController = async (request, reply) => {
  const { password, email } = request.body;
  //verifica si el usuario ya existe
  const findUser = await User.findOne({ email });
  //verifica contrasena
  const validPassword = bcryptjs.compareSync(password, findUser.password);
  //TOKEN
  const token = await generateJWT(findUser.id, findUser.name);

  validPassword && findUser
    ? reply.send({ message: 'Login Successfully', user: findUser, token })
    : reply.status(400).send({ message: 'Error verifica el email y o la contrasena' });
};

const ValidarToken = async (request, reply) => {
  const token = request.headers['x-token'];
  if (!token) return reply.status(401).send({ message: 'No hay token en la peticion' });

  try {
    const { uid, name } = await jwt.verify(token, process.env.SECRET_JWT_SEED);
    const newToken = await generateJWT(uid, name);
    request.uid = uid;
    request.name = name;
    reply = ({...reply, message: 'Token renovado', uid, name, token: newToken });
  } catch (error) {
    reply.status(401).send({ message: 'Token no valido' });
  }
};

module.exports = { registerController, loginController, ValidarToken };
