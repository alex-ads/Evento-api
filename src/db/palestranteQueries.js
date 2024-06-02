const connection = require('./connection');

const insertPalestrante = async (nome, titulo) => {
  const [result] = await connection.execute(`
    INSERT INTO palestrante (nome, titulo)
    VALUES (?, ?);
  `, [nome, titulo]);

  return result;
};

const findAllPalestrantes = () => connection.execute(`
  SELECT * FROM palestrante;
`);

const findPalestrantesId = (id) => connection.execute(`
  SELECT * FROM palestrante WHERE id = ?
`, [id]);

const updatePalestrantes = (id, palestrante) => connection.execute(`
  UPDATE palestrante
  SET nome = ?, titulo = ?
  WHERE id = ?
`, [palestrante.nome, palestrante.titulo, id]);

const deletePalestrantes = (id) => connection.execute(`
  DELETE FROM palestrante where id = ?
`, [id]);


module.exports = {
  insertPalestrante,
  findAllPalestrantes,
  findPalestrantesId,
  updatePalestrantes,
  deletePalestrantes
};
