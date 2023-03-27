require('dotenv').config();
const CalendarRoutes = require('./routes/calendar.routes');
const AuthRoutes = require('./routes/auth.routes');
const dbConnection = require('./utils/mongoose');
const cors = require('@fastify/cors');

const fastify = require('fastify')({
  // logger: true,
});

// Enable CORS
fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

//Base de datos
dbConnection();

// // Declare a route
// fastify.get('/', async (request, reply) => {
//   reply.send({ Msg: 'Bienvenido al Api Calendar', port: process.env.PORT });
// });

// mapeo las rutas y despues con el fastify.route las lanzo
CalendarRoutes.map((route) => {
  fastify.route(route);
});

AuthRoutes.map((route) => {
  fastify.route(route);
});

// Run the server!
const start = async () => {
  try {
    fastify.listen({ port: process.env.PORT });
    console.log(` ------> Server listening on port => ${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
