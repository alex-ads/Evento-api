const express = require('express');
const router = express.Router();
const { insertEvento, findAllEventos, findEventoById, updateEvento, deleteEvento } = require("../db/eventoQueries");
const rescue = require('express-rescue');

router.post("/", rescue(async (req, res) => {
    const { nome, data, horario, local } = req.body;
    const result = await insertEvento(nome, data, horario, local);

    return res.status(201).json({ message: `Evento cadastrado com o id ${result.insertId}` });
}));

router.get("/", rescue(async (req, res) => {
    const [result] = await findAllEventos();
    return res.status(200).json(result);
}));

router.get("/:id", rescue(async (req, res) => {
    const { id } = req.params;
    const [[result]] = await findEventoById(id)

    if (!result) {
        return res.status(404).json({ message: "Evento não encontrado!" })
    }

    return res.status(200).json(result)
}));

router.put("/:id", rescue(async (req, res) => {
    const { id } = req.params;
    const evento = req.body;
    const [result] = await updateEvento(id, evento);

    if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados" })
    }

    return res.status(200).json({ message: `Evento com o id ${id} atualizado com sucesso!` });
}));

router.delete("/:id", rescue(async (req, res) => {
    const { id } = req.params;
    const [result] = await deleteEvento(id);

    if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados" })
    }

    return res.status(200).json({ message: `Evento com o id ${id} foi deletado com sucesso!` });
}));

module.exports = router;
