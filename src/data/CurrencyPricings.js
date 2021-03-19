const axios = require('axios');

const getCurrencyPricingData = function(currency) {
  const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${currency}&market=CAD&apikey=${process.env.REACT_ALPHA_VANTAGE_KEY}`;
  return axios.get(url)
    .then(res => {
      const data = res.data["Time Series (Digital Currency Daily)"];
      
      let pricings = {};

      for (const date in data) {
        pricings[date] = data[date]['4a. close (CAD)']; 
      }

      return pricings;
    });
};

export default getCurrencyPricingData;