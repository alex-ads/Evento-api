const pool = require('./connection');

// Obter todos os eventos
const findAllEventos = () => pool.execute('SELECT * FROM eventos');

// Obter um evento por ID
const findEventoById = (id) => pool.execute('SELECT * FROM eventos WHERE id = ?', [id]);

// Criar um novo evento
const createEvento = (evento) => pool.execute(
  'INSERT INTO eventos (nome, data_inicio, data_fim, local) VALUES (?, ?, ?, ?)',
  [evento.nome, evento.data_inicio, evento.data_fim, evento.local]
);

// Atualizar um evento existente
const updateEvento = (id, evento) => pool.execute(
  'UPDATE eventos SET nome = ?, data_inicio = ?, data_fim = ?, local = ? WHERE id = ?',
  [evento.nome, evento.data_inicio, evento.data_fim, evento.local, id]
);

// Excluir um evento
const deleteEvento = (id) => pool.execute('DELETE FROM eventos WHERE id = ?', [id]);

const existsEventoByDataLocal = async (data_inicio, data_fim, local, id = null) => {
  // Converter datas para o formato correto, se necessário
  const dataInicio = new Date(data_inicio).toISOString().split('T')[0];
  const dataFim = new Date(data_fim).toISOString().split('T')[0];
  
  // Montar a consulta SQL
  const query = `
    SELECT COUNT(*) AS total FROM eventos
    WHERE (
      (data_inicio <= ? AND data_fim >= ?) OR
      (data_inicio >= ? AND data_fim <= ?) OR
      (data_inicio <= ? AND data_inicio >= ?) OR
      (data_fim >= ? AND data_fim <= ?)
    ) AND local = ?
    ${id ? 'AND id != ?' : ''}
  `;
  
  const params = [dataFim, dataInicio, dataInicio, dataFim, dataInicio, dataFim, dataInicio, dataFim, local];
  if (id) {
    params.push(id);
  }
  
  // Executar a consulta e retornar o resultado
  const [rows] = await pool.execute(query, params);
  return rows[0].total > 0;
};


module.exports = {
  findAllEventos,
  findEventoById,
  createEvento,
  updateEvento,
  deleteEvento,
  existsEventoByDataLocal
};
