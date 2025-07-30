const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // para parsear JSON
app.use(cors()); // liberar CORS para o frontend

// Banco de dados
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  // Criação da tabela messages
  db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Rota para enviar mensagem
app.post('/messages', (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === '') {
    return res.status(400).json({ error: 'Mensagem vazia' });
  }
  db.run(`INSERT INTO messages (message) VALUES (?)`, [message], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar mensagem' });
    }
    res.json({ id: this.lastID, message });
  });
});

// Rota para obter mensagens (para admin)
app.get('/messages', (req, res) => {
  db.all(`SELECT * FROM messages ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
