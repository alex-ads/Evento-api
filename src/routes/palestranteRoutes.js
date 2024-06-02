const express = require('express');
const router = express.Router();
const { insertPalestrante, findAllPalestrantes, findPalestrantesId, updatePalestrantes, deletePalestrantes } = require("../db/palestranteQueries");
const rescue = require('express-rescue');

router.post("/", rescue(async (req, res) => {
    const { nome, titulo } = req.body;
    const result = await insertPalestrante(nome, titulo);

    return res.status(201).json({ message: `Palestrante cadastrado com o id ${result.insertId}` });
}));

router.get("/", rescue(async (req, res) => {
    const [result] = await findAllPalestrantes();
    return res.status(200).json(result);
}));

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const [[result]] = await findPalestrantesId(id)

    if (!result) {
        return res.status(404).json({ message: "Pessoa não encontrada!" })
    }

    return res.status(200).json(result)
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const transaction = req.body;
    const [result] = await updatePalestrantes(id, transaction);

    if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados" })
    }

    return res.status(200).json({ message: `Transação com o id ${id} atualizada com sucesso!` });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const [result] = await deletePalestrantes(id);

    if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados" })
    }

    return res.status(200).json({ message: `Pessoa com o id ${id} foi deletada com sucesso!` });
});

module.exports = router;
