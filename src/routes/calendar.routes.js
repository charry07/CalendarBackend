const { ValidarToken } = require('../controllers/auth');

const CalendarRoutes = [
  {
    url: '/events',
    method: 'GET',
    handler: async (request, reply) => {
      ValidarToken(request, reply);
      reply.send({ message: 'Aqui van todos los eventos' });
    },
  },
  {
    url: '/events/:id',
    method: 'GET',
    handler: async (request, reply) => {
      ValidarToken(request, reply);
      reply.send({ message: 'consultado un solo evento' });
    },
  },
  {
    url: '/events',
    method: 'POST',
    handler: async (request, reply) => {
      ValidarToken(request, reply);
      reply.send({ message: 'Creando un evento' });
    },
  },
  {
    url: '/events/:id',
    method: 'DELETE',
    handler: async (request, reply) => {
      ValidarToken(request, reply);
      reply.send({ message: 'Eliminando un evento' });
    },
  },
  {
    url: '/events/:id',
    method: 'PUT',
    handler: async (request, reply) => {
      ValidarToken(request, reply);
      reply.send({ message: 'Actualizando' });
    },
  },
];

module.exports = CalendarRoutes;
