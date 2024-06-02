const connection = require('./connection');

const insertPalestra = async (tema, data, horario, palestrante_id, evento_id) => {
  const [result] = await connection.execute(`
    INSERT INTO palestra (tema, data, horario, palestrante_id, evento_id)
    VALUES (?, ?, ?, ?, ?);
  `, [tema, data, horario, palestrante_id, evento_id]);

  return result;
};

const findAllPalestras = () => connection.execute(`
  SELECT * FROM palestra;
`);

const findPalestraById = (id) => connection.execute(`
  SELECT * FROM palestra WHERE id = ?
`, [id]);

const updatePalestra = (id, palestra) => connection.execute(`
  UPDATE palestra
  SET tema = ?, data = ?, horario = ?, palestrante_id = ?, evento_id = ?
  WHERE id = ?
`, [palestra.tema, palestra.data, palestra.horario, palestra.palestrante_id, palestra.evento_id, id]);

const deletePalestra = (id) => connection.execute(`
  DELETE FROM palestra WHERE id = ?
`, [id]);

module.exports = {
  insertPalestra,
  findAllPalestras,
  findPalestraById,
  updatePalestra,
  deletePalestra
};
