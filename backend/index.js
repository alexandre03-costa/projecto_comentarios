const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const FILE_PATH = './comentarios.json';

// Função para ler os comentários do arquivo
function lerComentarios() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler o arquivo:', err);
    return [];
  }
}

// Função para salvar os comentários no arquivo
function salvarComentarios(comentarios) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(comentarios, null, 2));
  } catch (err) {
    console.error('Erro ao escrever no arquivo:', err);
  }
}

// Rota para obter os comentários
app.get('/comentarios', (req, res) => {
  const comentarios = lerComentarios();
  res.json(comentarios);
});

// Rota para adicionar um novo comentário
app.post('/comentarios', (req, res) => {
  const { nome, tipo, comentario } = req.body;
  if (!nome || !comentario) {
    return res.status(400).json({ error: 'Nome e comentário são obrigatórios' });
  }
  const comentarios = lerComentarios();
  comentarios.push({ nome, tipo, comentario });
  salvarComentarios(comentarios);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
