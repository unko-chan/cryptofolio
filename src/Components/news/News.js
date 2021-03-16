const axios = require('axios');
let today = new Date()

let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const newsRequest = () => {
  axios.get(`https://newsapi.org/v2/everything?q=Bitcoin&from=date&sortBy=popularity&apiKey=NEWS_API`)
  .then(response => JSON.parse(response))
  .then(data => console.log(data))
  .catch(error => console.log(error));
}
console.log(date)
newsRequest();
