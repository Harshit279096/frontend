const express = require('express');
const bodyParser = require('body-parser');
const plaid = require('plaid');

const app = express();
app.use(bodyParser.json());

const PLAID_CLIENT_ID = '66961baa053691001af0428a';
const PLAID_SECRET = '525f903fb17e07344f0f2f2783467b';
const PLAID_ENV = plaid.environments.development; // Change to 'plaid.environments.development' for production

const client = new plaid.Client({
  clientID: PLAID_CLIENT_ID,
  secret: PLAID_SECRET,
  env: PLAID_ENV,
});

// Endpoint to create a link token
app.post('/create_link_token', async (req, res) => {
  const request = {
    user: {
      client_user_id: 'unique_user_id', // Replace with a unique identifier for your user
    },
    client_name: 'Your App Name',
    products: ['transactions'],
    country_codes: ['US'],
    language: 'en',
  };

  try {
    const response = await client.linkTokenCreate(request);
    res.json({ link_token: response.link_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to exchange public token for access token
app.post('/exchange_public_token', async (req, res) => {
  const { public_token } = req.body;

  try {
    const response = await client.exchangePublicToken(public_token);
    const access_token = response.access_token;
    res.json({ access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to fetch transactions
app.post('/transactions', async (req, res) => {
  const { access_token } = req.body;

  try {
    const response = await client.getTransactions(
      access_token,
      '2021-01-01', // start date
      '2021-12-31'  // end date
    );
    res.json(response.transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
