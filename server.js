const express = require('express');
const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');

const app = express();
app.use(express.json());

// Substitua pelo seu Access Token do Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-2575152982556551-081911-314c09e448b3dfadd87b4fd7c2cc0fef-3259751109' 
});

app.get('/', (req, res) => {
  res.send('Servidor do PDV ativo');
});

// Rota de criação de cobrança/preferência
app.post('/create_payment', async (req, res) => {
  try {
    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: [
          {
            title: req.body.title || 'Venda PDV',
            unit_price: Number(req.body.amount || req.body.price),
            quantity: 1,
          }
        ]
      }
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota do Webhook de notificações
app.post('/alerts', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
