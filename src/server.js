// Importa o módulo 'app' que representa a aplicação Express
const app = require('./app');

// Importa o módulo de conexão com o banco de dados
const connection = require('./db/connection');

// Define a porta em que o servidor irá escutar
const PORT = 3001;

// Inicia o servidor Express para escutar requisições na porta especificada
app.listen(PORT, async () => console.log(`Servidor rodando em http://localhost:${PORT}/`));