const pool = require('./connection');

// Associar uma palestra a um evento
const addPalestraToEvento = (eventoId, palestraId) => pool.execute(
  'INSERT INTO eventos_palestras (evento_id, palestra_id) VALUES (?, ?)',
  [eventoId, palestraId]
);

// Remover uma palestra de um evento
const removePalestraFromEvento = (eventoId, palestraId) => pool.execute(
  'DELETE FROM eventos_palestras WHERE evento_id = ? AND palestra_id = ?',
  [eventoId, palestraId]
);

// Obter todos os eventos de uma palestra
const findEventosByPalestra = (palestraId) => pool.execute(
  `SELECT e.* FROM eventos e
  JOIN eventos_palestras ep ON e.id = ep.evento_id
  WHERE ep.palestra_id = ?`,
  [palestraId]
);

// Obter todas as palestras de um evento (já implementada em palestraQueries.js)
// const findPalestrasByEvento = (eventoId) => pool.execute(
//   `SELECT p.* FROM palestras p
//   JOIN eventos_palestras ep ON p.id = ep.palestra_id
//   WHERE ep.evento_id = ?`,
//   [eventoId]
// );

module.exports = {
  addPalestraToEvento,
  removePalestraFromEvento,
  findEventosByPalestra,
  // findPalestrasByEvento (já em palestraQueries.js)
};
