const connection = require('./connection');

const insertEvento = async (nome, data, horario, local) => {
  const [result] = await connection.execute(`
    INSERT INTO evento (nome, data, horario, local)
    VALUES (?, ?, ?, ?);
  `, [nome, data, horario, local]);

  return result;
};

const findAllEventos = () => connection.execute(`
  SELECT * FROM evento;
`);

const findEventoById = (id) => connection.execute(`
  SELECT * FROM evento WHERE id = ?
`, [id]);

const updateEvento = (id, evento) => connection.execute(`
  UPDATE evento
  SET nome = ?, data = ?, horario = ?, local = ?
  WHERE id = ?
`, [evento.nome, evento.data, evento.horario, evento.local, id]);

const deleteEvento = (id) => connection.execute(`
  DELETE FROM evento WHERE id = ?
`, [id]);

module.exports = {
  insertEvento,
  findAllEventos,
  findEventoById,
  updateEvento,
  deleteEvento
};
