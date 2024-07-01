const pool = require('./connection');

// Associar uma palestra a um evento
const addPalestraToEvento = async (eventoId, palestraId) => {
  const [result] = await pool.execute(
    'INSERT INTO eventos_palestras (evento_id, palestra_id) VALUES (?, ?)',
    [eventoId, palestraId]
  );
  return result.insertId;
};

// Remover uma palestra de um evento
const removePalestraFromEvento = async (eventoId, palestraId) => {
  await pool.execute(
    'DELETE FROM eventos_palestras WHERE evento_id = ? AND palestra_id = ?',
    [eventoId, palestraId]
  );
};

// Obter todos os eventos de uma palestra
const findEventosByPalestra = async (palestraId) => {
  const [rows] = await pool.execute(
    `SELECT e.* FROM eventos e
     JOIN eventos_palestras ep ON e.id = ep.evento_id
     WHERE ep.palestra_id = ?`,
    [palestraId]
  );
  return rows;
};

module.exports = {
  addPalestraToEvento,
  removePalestraFromEvento,
  findEventosByPalestra,
};
