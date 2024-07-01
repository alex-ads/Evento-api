const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');
const { findAllPalestrantes, findPalestranteById, createPalestrante, updatePalestrante, deletePalestrante } = require('../db/palestranteQueries');

// GET /palestrantes
router.get('/', rescue(async (req, res) => {
    const palestrantes = await findAllPalestrantes();
    res.json(palestrantes);
}));

// GET /palestrantes/:id
router.get('/:id', rescue(async (req, res) => {
    const palestrante = await findPalestranteById(req.params.id);
    if (!palestrante) return res.status(404).json({ message: "Palestrante não encontrado!" });
    res.json(palestrante);
}));

// POST /palestrantes
router.post('/', rescue(async (req, res) => {
    const { nome, titulo } = req.body;

    // Validações
    if (!nome || !titulo) {
        return res.status(400).json({ message: "Nome e título são obrigatórios." });
    }
    if (!['Especialista', 'Mestre', 'Doutor', 'Outros'].includes(titulo)) {
        return res.status(400).json({ message: "Título inválido." });
    }

    const id = await createPalestrante(req.body);
    res.status(201).json({ id, message: "Palestrante criado com sucesso!" });
}));


// PUT /palestrantes/:id
router.put('/:id', rescue(async (req, res) => {
    const { nome, titulo } = req.body;

    // Validações
    if (!nome || !titulo) {
        return res.status(400).json({ message: "Nome e título são obrigatórios." });
    }
    if (!['Especialista', 'Mestre', 'Doutor', 'Outros'].includes(titulo)) {
        return res.status(400).json({ message: "Título inválido." });
    }
    const palestrante = await findPalestranteById(req.params.id);
    if (!palestrante) return res.status(404).json({ message: "Palestrante não encontrado!" });

    await updatePalestrante(req.params.id, req.body);
    res.json({ message: "Palestrante atualizado com sucesso!" });
}));

// DELETE /palestrantes/:id
router.delete('/:id', rescue(async (req, res) => {
    const palestrante = await findPalestranteById(req.params.id);
    if (!palestrante) return res.status(404).json({ message: "Palestrante não encontrado!" });
    await deletePalestrante(req.params.id);
    res.json({ message: "Palestrante excluído com sucesso!" });
}));

module.exports = router;
