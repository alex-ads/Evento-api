const pool = require('./connection');

// Obter todos os palestrantes
const findAllPalestrantes = () => pool.execute('SELECT * FROM palestrantes');

// Obter um palestrante por ID
const findPalestranteById = (id) => pool.execute('SELECT * FROM palestrantes WHERE id = ?', [id]);

// Criar um novo palestrante
const createPalestrante = (palestrante) => pool.execute(
  'INSERT INTO palestrantes (nome, titulo) VALUES (?, ?)',
  [palestrante.nome, palestrante.titulo]
);

// Atualizar um palestrante existente
const updatePalestrante = (id, palestrante) => pool.execute(
  'UPDATE palestrantes SET nome = ?, titulo = ? WHERE id = ?',
  [palestrante.nome, palestrante.titulo, id]
);

// Excluir um palestrante
const deletePalestrante = (id) => pool.execute('DELETE FROM palestrantes WHERE id = ?', [id]);

// Verificar se um palestrante existe pelo ID
const existsPalestranteById = (id) => pool.execute(
  'SELECT COUNT(*) AS total FROM palestrantes WHERE id = ?',
  [id]
).then(([rows]) => rows[0].total > 0);

module.exports = {
  findAllPalestrantes,
  findPalestranteById,
  createPalestrante,
  updatePalestrante,
  deletePalestrante,
  existsPalestranteById
};
