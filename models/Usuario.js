const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_]+$/,
  },
  passwordHash: { type: String, required: true },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
