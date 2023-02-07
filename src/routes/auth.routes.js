const { registerController, loginController, ValidarToken } = require('../controllers/auth');

const AuthRoutes = [
  {
    url: '/auth/register',
    method: 'POST',
    handler: registerController,
  },
  {
    url: '/auth/login',
    method: 'POST',
    handler: loginController,
  },
  {
    url: '/auth/renewToken',
    method: 'GET',
    handler: ValidarToken,
  },
];

module.exports = AuthRoutes;
