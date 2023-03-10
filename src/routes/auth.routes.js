const { registerController, loginController, renewValidarToken } = require('../controllers/auth');

const AuthRoutes = [
  {
    url: '/api/auth/register',
    method: 'POST',
    handler: registerController,
  },
  {
    url: '/api/auth/login',
    method: 'POST',
    handler: loginController,
  },
  {
    url: '/api/auth/renewToken',
    method: 'GET',
    handler: renewValidarToken,
  },
];

module.exports = AuthRoutes;
