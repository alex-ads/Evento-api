const pool = require('./connection');

// Obter todos os palestrantes
const findAllPalestrantes = async () => {
  const [rows] = await pool.execute('SELECT * FROM palestrantes');
  return rows;
};

// Obter um palestrante por ID
const findPalestranteById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM palestrantes WHERE id = ?', [id]);
  return rows[0] || null;
};

// Criar um novo palestrante
const createPalestrante = async (palestrante) => {
  const [result] = await pool.execute(
    'INSERT INTO palestrantes (nome, titulo) VALUES (?, ?)',
    [palestrante.nome, palestrante.titulo]
  );
  return result.insertId;
};

// Atualizar um palestrante existente
const updatePalestrante = async (id, palestrante) => {
  await pool.execute(
    'UPDATE palestrantes SET nome = ?, titulo = ? WHERE id = ?',
    [palestrante.nome, palestrante.titulo, id]
  );
};

// Excluir um palestrante
const deletePalestrante = async (id) => {
  await pool.execute('DELETE FROM palestrantes WHERE id = ?', [id]);
};

// Verificar se um palestrante existe pelo ID
const existsPalestranteById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT COUNT(*) AS total FROM palestrantes WHERE id = ?',
    [id]
  );
  return rows[0].total > 0;
};

module.exports = {
  findAllPalestrantes,
  findPalestranteById,
  createPalestrante,
  updatePalestrante,
  deletePalestrante,
  existsPalestranteById
};
