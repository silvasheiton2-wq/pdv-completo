const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('servidor do PDV ativo');
});

app.post('/alerts', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}`));

