const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota para servir o arquivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});