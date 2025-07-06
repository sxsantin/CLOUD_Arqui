const express = require('express');
const { body, validationResult } = require('express-validator');
const Libro = require('../models/Libro');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET libros (público)
router.get('/', async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch {
    res.status(500).send('Error del servidor');
  }
});

// POST libro (protegido)
router.post('/',
  authMiddleware,
  body('titulo').trim().notEmpty().escape(),
  body('autor').trim().notEmpty().escape(),
  body('anio').isInt({ min: 0, max: 2100 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    try {
      const nuevoLibro = new Libro(req.body);
      await nuevoLibro.save();
      res.status(201).send('Libro agregado');
    } catch {
      res.status(400).send('Error al guardar el libro');
    }
  });

// PUT libro (protegido)
router.put('/:id',
  authMiddleware,
  body('titulo').trim().notEmpty().escape(),
  body('autor').trim().notEmpty().escape(),
  body('anio').isInt({ min: 0, max: 2100 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });

    try {
      await Libro.findByIdAndUpdate(req.params.id, req.body);
      res.send('Libro actualizado');
    } catch {
      res.status(500).send('Error al actualizar');
    }
  });

// DELETE libro (protegido)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Libro.findByIdAndDelete(req.params.id);
    res.send('Libro eliminado');
  } catch {
    res.status(500).send('Error al eliminar');
  }
});

module.exports = router;
