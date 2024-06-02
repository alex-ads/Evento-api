const express = require('express');
const router = express.Router();
const { insertPalestra, findAllPalestras, findPalestraById, updatePalestra, deletePalestra } = require("../db/palestraQueries");
const rescue = require('express-rescue');

router.post("/", rescue(async (req, res) => {
    const { tema, data, horario, palestrante_id, evento_id } = req.body;
    const result = await insertPalestra(tema, data, horario, palestrante_id, evento_id);

    return res.status(201).json({ message: `Palestra cadastrada com o id ${result.insertId}` });
}));

router.get("/", rescue(async (req, res) => {
    const [result] = await findAllPalestras();
    return res.status(200).json(result);
}));

router.get("/:id", rescue(async (req, res) => {
    const { id } = req.params;
    const [[result]] = await findPalestraById(id)

    if (!result) {
        return res.status(404).json({ message: "Palestra não encontrada!" })
    }

    return res.status(200).json(result)
}));

router.put("/:id", rescue(async (req, res) => {
    const { id } = req.params;
    const palestra = req.body;
    const [result] = await updatePalestra(id, palestra);

    if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados" })
    }

    return res.status(200).json({ message: `Palestra com o id ${id} atualizada com sucesso!` });
}));

router.delete("/:id", rescue(async (req, res) => {
    const { id } = req.params;
    const [result] = await deletePalestra(id);

    if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Nenhuma alteração realizada. Tente com outros dados" })
    }

    return res.status(200).json({ message: `Palestra com o id ${id} foi deletada com sucesso!` });
}));

module.exports = router;
