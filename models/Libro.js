const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, required: true, trim: true },
  anio: {
    type: Number,
    required: true,
    min: 0,
    max: 2100,
  },
});

module.exports = mongoose.model('Libro', LibroSchema);
