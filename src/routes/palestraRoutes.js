const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');
const { findAllPalestras, findPalestraById, createPalestra, updatePalestra, deletePalestra, findPalestrasByPalestrante } = require('../db/palestraQueries');
const { existsPalestranteById } = require('../db/palestranteQueries');

// GET /palestras
router.get('/', rescue(async (req, res) => {
  const palestras = await findAllPalestras();
  res.json(palestras);
}));

// GET /palestras/:id
router.get('/:id', rescue(async (req, res) => {
  const palestra = await findPalestraById(req.params.id);
  if (!palestra) return res.status(404).json({ message: "Palestra não encontrada!" });
  res.json(palestra);
}));

// POST /palestras
router.post('/', rescue(async (req, res) => {
  const { tema, data_horario, palestrante_id } = req.body;

  // Validações
  if (!tema || !data_horario || !palestrante_id) {
    return res.status(400).json({ message: "Tema, data/hora e palestrante são obrigatórios." });
  }
  if (!(await existsPalestranteById(palestrante_id))) {
    return res.status(400).json({ message: "Palestrante não cadastrado!" });
  }
  // Validação da data e hora (opcional, se necessário)

  const id = await createPalestra(req.body);
  res.status(201).json({ id, message: "Palestra criada com sucesso!" });
}));

// PUT /palestras/:id
router.put('/:id', rescue(async (req, res) => {
  const { tema, data_horario, palestrante_id } = req.body;

  // Validações
  if (!tema || !data_horario || !palestrante_id) {
    return res.status(400).json({ message: "Tema, data/hora e palestrante são obrigatórios." });
  }
  if (!(await existsPalestranteById(palestrante_id))) {
    return res.status(400).json({ message: "Palestrante não cadastrado!" });
  }
  const palestra = await findPalestraById(req.params.id);
  if (!palestra) return res.status(404).json({ message: "Palestra não encontrada!" });
  // Validação da data e hora (opcional, se necessário)

  await updatePalestra(req.params.id, req.body);
  res.json({ message: "Palestra atualizada com sucesso!" });
}));

// DELETE /palestras/:id
router.delete('/:id', rescue(async (req, res) => {
  const palestra = await findPalestraById(req.params.id);
  if (!palestra) return res.status(404).json({ message: "Palestra não encontrada!" });
  await deletePalestra(req.params.id);
  res.json({ message: "Palestra excluída com sucesso!" });
}));

// GET /palestrantes/:palestranteId/palestras
router.get('/:palestranteId/palestras', rescue(async (req, res) => {
  const palestras = await findPalestrasByPalestrante(req.params.palestranteId);
  res.json(palestras);
}));

module.exports = router;
