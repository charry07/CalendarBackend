const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, 'El titulo es obligatorio'],
  },
  notes: {
    type: String,
    required: [true, 'Las notas son obligatorio'],
  },
  start: {
    type: Date,
    required: [true, 'La fecha de inicio es obligatorio'],
  },
  end: {
    type: Date,
    required: [true, 'La fecha de finalizacion es obligatorio'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'El usuario es obligatorio'],
  },
});

eventSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Evento', eventSchema);
