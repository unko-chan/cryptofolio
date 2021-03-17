import { ArtTrackOutlined } from '@material-ui/icons';
import { react, useEffect, useLayoutEffect, useState } from 'react';

import data from '../../data/accounts.json';
import { getBalances } from '../../helpers/pieChartHelper.js';
import { fullCurrencyName } from '../../helpers/transactionHelper';
import ArticleListItem from './ArticleListItem';

require('dotenv').config()

const axios = require('axios');
let today = new Date()
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const userCurrencies = getBalances(data)

// const useAllCurrencies = (currenciesArr) => {
//   for(let x = 0; x < currenciesArr.length; x++) {
    
//   }
// }

const ArticleList = (props) => {
  
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getArticles()
  }, [])

  const getArticles = () => {
  
    axios.get(`https://newsapi.org/v2/everything?q=bitcoin&from=${date}&sortBy=popularity&language=en&pageSize=5&apiKey=${process.env.REACT_APP_NEWS3}`)
      .then(response => setArticles(response.data.articles))
      .then((data) => { return data})
      .catch(err => console.log(err));
  
  }

  
  const articleData = articles.map((article) => {
    return (
      <ArticleListItem
       name={article.name}
       author={article.author}
       description={article.description}
       url={article.url} 
      />
    )
  })

  return (
      <section>
        {articleData}

      </section>
    )
}


// const getArticles = () => {
//   const userCurrencyPromises = [];
//   for(let x = 0; x < userCurrencies.length; x++) {
//     userCurrencyPromises.push(axios.get(`https://newsapi.org/v2/everything?q=&from=${date}&sortBy=popularity&language=en&pageSize=1&apiKey=${process.env.REACT_APP_NEWS3}`))
//   }  
//     Promise.all(userCurrencyPromises)
//     .then(response => console.log(response))
//     .catch(err => console.log(err));


export default ArticleList;