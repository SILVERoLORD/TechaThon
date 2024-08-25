app.use(cors());
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const ALPHA_VANTAGE_API_KEY = 'UG45DOG1YW49OQLD';

// Endpoint for real-time stock data
app.get('/api/stocks/realtime/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase(); // Convert symbol to uppercase
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const data = response.data['Global Quote'];
    if (data) {
      // Check if '05. price' exists before accessing it
      const price = data['05. price'] || 'N/A';

      res.json({
        symbol: symbol,
        price: price,
        change: data['09. change'] || 'N/A',
        changePercent: data['10. change percent'] || 'N/A',
      });
    } else {
      res.status(404).json({ error: 'Symbol not found or data unavailable' });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... (Placeholders for historical and prediction endpoints)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});