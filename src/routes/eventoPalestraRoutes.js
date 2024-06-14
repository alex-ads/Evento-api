const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');
const { addPalestraToEvento, removePalestraFromEvento, findEventosByPalestra } = require('../db/eventoPalestraQueries');
const { findEventoById } = require('../db/eventoQueries');
const { findPalestraById } = require('../db/palestraQueries');

// POST /eventos/:eventoId/palestras/:palestraId
router.post('/eventos/:eventoId/palestras/:palestraId', rescue(async (req, res) => {
  const { eventoId, palestraId } = req.params;

  // Validações (eventoId, palestraId) - Implemente as validações necessárias aqui
  const evento = await findEventoById(eventoId);
  if (!evento) return res.status(404).json({ message: "Evento não encontrado!" });
  const palestra = await findPalestraById(palestraId);
  if (!palestra) return res.status(404).json({ message: "Palestra não encontrada!" });

  await addPalestraToEvento(eventoId, palestraId);
  res.status(201).json({ message: "Palestra associada ao evento com sucesso!" });
}));

// DELETE /eventos/:eventoId/palestras/:palestraId
router.delete('/eventos/:eventoId/palestras/:palestraId', rescue(async (req, res) => {
  const { eventoId, palestraId } = req.params;

  // Validações (eventoId, palestraId) - Implemente as validações necessárias aqui
  const evento = await findEventoById(eventoId);
  if (!evento) return res.status(404).json({ message: "Evento não encontrado!" });
  const palestra = await findPalestraById(palestraId);
  if (!palestra) return res.status(404).json({ message: "Palestra não encontrada!" });

  await removePalestraFromEvento(eventoId, palestraId);
  res.json({ message: "Palestra removida do evento com sucesso!" });
}));

// GET /palestras/:palestraId/eventos
router.get('/palestras/:palestraId/eventos', rescue(async (req, res) => {
  const eventos = await findEventosByPalestra(req.params.palestraId);
  res.json(eventos);
}));

module.exports = router;
