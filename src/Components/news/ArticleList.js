import { Grid } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import data from '../../data/accounts.json';
import { getBalances } from '../../helpers/pieChartHelper.js';
import { fullCurrencyName } from '../../helpers/transactionHelper';
import ArticleListItem from './ArticleListItem';
import './news.scss'

const axios = require('axios');

let today = new Date()
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() - 5;

const userCurrenciesFullNames = []
let newArticles = []



Object.keys(userCurrencies).map((key) => {
  userCurrenciesFullNames.push(fullCurrencyName(key));
});

const ArticleList = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    newArticles = [];
    getWallet();
  }, [])

  const getWallet = async () => {
    const data = await fetch("http://localhost:5432/users/1/wallet", {
      headers: { "Content-Type": "application/json"}
    }).then( async (response) => {
      const symbols = await response.json()
      return symbols;
    })
    console.log(data)
   data.map((symbol) => {
   userCurrenciesFullNames.push(fullCurrencyName(symbol.currency_symbol))
    })
  for (let x = 0; x < userCurrenciesFullNames.length; x++) {
    
    getArticles(userCurrenciesFullNames, x);
    }
  }

  const getArticles = (userCurrencies, x) => {
  userCurrencies.map((currency) => {
    axios.get(`https://newsapi.org/v2/everything?q="${currency}"&from=${date}&language=en&pageSize=5&apiKey=${process.env.REACT_APP_NEWS}`)
    .then((results) => { 
      if (results.data.articles.length > 0)
        setArticles(prevState =>
            [...prevState, [results.data.articles[x].title, results.data.articles[x].author, results.data.articles[x].description, results.data.articles[x].url]])})
    .catch(err => console.log(err))
    })
  }


  const articleData = articles.map((article, index) => {
    console.log(articles)
    if (newArticles.includes(article[0]) === false) {
      
     return (
      <ArticleListItem
        key={index}
        name={article[0]}
        author={article[1]}
        description={article[2]}
        url={article[3]}   
       />
     )

   }
   newArticles.push(article[0]) 
  });

  return (
    <section className='article-page'>
    <h2>News Articles</h2>
    <div className='article-container'>
    {articleData}
    </div>
    </section>
    )
}

export default ArticleList;
