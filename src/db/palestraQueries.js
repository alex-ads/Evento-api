const pool = require('./connection');

// Obter todas as palestras
const findAllPalestras = () => pool.execute('SELECT * FROM palestras');

// Obter uma palestra por ID
const findPalestraById = (id) => pool.execute('SELECT * FROM palestras WHERE id = ?', [id]);

// Criar uma nova palestra
const createPalestra = (palestra) => pool.execute(
  'INSERT INTO palestras (tema, data_horario, palestrante_id) VALUES (?, ?, ?)',
  [palestra.tema, palestra.data_horario, palestra.palestrante_id]
);

// Atualizar uma palestra existente
const updatePalestra = (id, palestra) => pool.execute(
  'UPDATE palestras SET tema = ?, data_horario = ?, palestrante_id = ? WHERE id = ?',
  [palestra.tema, palestra.data_horario, palestra.palestrante_id, id]
);

// Excluir uma palestra
const deletePalestra = (id) => pool.execute('DELETE FROM palestras WHERE id = ?', [id]);

// Obter palestras por palestrante
const findPalestrasByPalestrante = (palestranteId) => pool.execute(
  'SELECT * FROM palestras WHERE palestrante_id = ?',
  [palestranteId]
);

// Obter palestras por evento
const findPalestrasByEvento = (eventoId) => pool.execute(
  `SELECT p.* FROM palestras p
  JOIN eventos_palestras ep ON p.id = ep.palestra_id
  WHERE ep.evento_id = ?`,
  [eventoId]
);

module.exports = {
  findAllPalestras,
  findPalestraById,
  createPalestra,
  updatePalestra,
  deletePalestra,
  findPalestrasByPalestrante,
  findPalestrasByEvento
};
