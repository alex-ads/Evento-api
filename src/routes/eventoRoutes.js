const express = require('express');
const router = express.Router();
const rescue = require('express-rescue');
const { findAllEventos, findEventoById, createEvento, updateEvento, deleteEvento, existsEventoByDataLocal } = require('../db/eventoQueries');
const { findPalestrasByEvento } = require('../db/palestraQueries'); // Para obter palestras do evento

// GET /eventos
router.get('/', rescue(async (req, res) => {
    const eventos = await findAllEventos();
    res.json(eventos);
}));

// GET /eventos/:id
router.get('/:id', rescue(async (req, res) => {
    const evento = await findEventoById(req.params.id);
    if (!evento) return res.status(404).json({ message: "Evento não encontrado!" });
    const palestras = await findPalestrasByEvento(req.params.id); // Obter palestras do evento
    res.json({ ...evento, palestras }); // Retornar evento com palestras
}));

// POST /eventos
router.post('/', rescue(async (req, res) => {
    const { nome, data_inicio, data_fim, local } = req.body;

    // Validações
    if (!nome || !data_inicio || !data_fim || !local) {
        return res.status(400).json({ message: "Nome, data de início, data de fim e local são obrigatórios." });
    }

    // Verificar se já existe um evento com as mesmas datas e local
    if (await existsEventoByDataLocal(data_inicio, data_fim, local)) {
        return res.status(400).json({ message: "Já existe um evento neste local e data!" });
    }

    // Validação para garantir que data_fim seja posterior a data_inicio (opcional)
    if (new Date(data_fim) <= new Date(data_inicio)) {
        return res.status(400).json({ message: "A data de fim deve ser posterior à data de início." });
    }

    // Criar o evento
    const id = await createEvento(req.body);
    res.status(201).json({ id, message: "Evento criado com sucesso!" });
}));


// PUT /eventos/:id
router.put('/:id', rescue(async (req, res) => {
    const { nome, data_inicio, data_fim, local } = req.body;

    // Validações
    if (!nome || !data_inicio || !data_fim || !local) {
        return res.status(400).json({ message: "Nome, data de início, data de fim e local são obrigatórios." });
    }
    if (await existsEventoByDataLocal(data_inicio, data_fim, local, req.params.id)) {
        return res.status(400).json({ message: "Já existe um evento neste local e data!" });
    }
    const evento = await findEventoById(req.params.id);
    if (!evento) return res.status(404).json({ message: "Evento não encontrado!" });
    // Validação para garantir que data_fim seja posterior a data_inicio (opcional)

    await updateEvento(req.params.id, req.body);
    res.json({ message: "Evento atualizado com sucesso!" });
}));

// DELETE /eventos/:id
router.delete('/:id', rescue(async (req, res) => {
    const evento = await findEventoById(req.params.id);
    if (!evento) return res.status(404).json({ message: "Evento não encontrado!" });
    await deleteEvento(req.params.id);
    res.json({ message: "Evento excluído com sucesso!" });
}));

// GET /eventos/:eventoId/palestras (já implementado na rota de palestras)

module.exports = router;
