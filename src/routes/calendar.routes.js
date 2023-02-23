const { ValidarToken } = require('../controllers/auth');
const Evento = require('../models/event');


const CalendarRoutes = [
  {
    url: '/api/events',
    method: 'GET',
    preHandler: (request, reply) => ValidarToken(request, reply), // funciona como un middleware
    handler: async (request, reply) => {
      try {
        const events = await Evento.find().populate('user' , 'name email');
        reply.send({ message: 'Aqui van todos los eventos' , events });
      } catch (error) {
        reply.status(500).send({ message: error });
      }
    },
  },
  {
    url: '/api/events/:id',
    method: 'GET',
    preHandler: (request, reply) => ValidarToken(request, reply), // funciona como un middleware
    handler: async (request, reply) => {
      try {
        const event = await Evento.findById(request.params.id);
        reply.send({ message: `Evento #${request.params.id}`, event });
      } catch (error) {
        reply.status(500).send({ message: error });
      }
    },
  },
  {
    url: '/api/events',
    method: 'POST',
    preHandler: (request, reply) => ValidarToken(request, reply), // funciona como un middleware
    handler: async (request, reply) => {
      const event = new Evento(request.body);
      try {
        event.user = request.uid;
        const eventGuardado = await event.save();
        reply.send({ message: 'Evento Creado!', eventGuardado });
      } catch (error) {
        reply.status(500).send({ message: error });
      }
    },
  },
  {
    url: '/api/events/:id',
    method: 'DELETE',
    preHandler: (request, reply) => ValidarToken(request, reply), // funciona como un middleware
    handler: async (request, reply) => {
      try {
        const event = await Evento.findById(request.params.id);
        if (!event) {
          reply.status(404).send({ message: 'Evento no encontrado' });
        }
        if (event.user.toString() !== request.uid) {
          reply.status(401).send({ message: 'No tiene privilegios para eliminar este evento' });
        }
        await Evento.findByIdAndDelete(request.params.id);
        reply.send({ message: `Evento ${request.params.id} eliminado correctamente!` });
      } catch (error) {
        reply.status(500).send({ message: error });
      }
    },
  },
  {
    url: '/api/events/:id',
    method: 'PUT',
    preHandler: (request, reply) => ValidarToken(request, reply), // funciona como un middleware
    handler: async (request, reply) => {
      try {
        const event = await Evento.findById(request.params.id);
        if (!event) {
          reply.status(404).send({ message: 'Evento no encontrado' });
        }
        if (event.user.toString() !== request.uid) {
          reply.status(401).send({ message: 'No tiene privilegios para actualizar este evento' });
        }
        const nuevoEvento = {
          ...request.body,
          user: request.uid,
        };
        const eventActualizado = await Evento.findByIdAndUpdate(request.params.id, nuevoEvento, { new: true });
        reply.send({ message: `Evento ${request.params.id} actualizado correctamente!`, eventActualizado });
      } catch (error) {
        reply.status(500).send({ message: error });
      }
    },
  },
];

module.exports = CalendarRoutes;
