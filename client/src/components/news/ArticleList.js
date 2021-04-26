import { Grid } from '@material-ui/core';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
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
let isMounted;
let alreadyRun


const ArticleList = (props) => {

  const [articles, setArticles] = useState([]);
  
  useEffect( () => {
    isMounted = true;
    getWallet();
    document.title = 'Cryptofolio';
    return () => {isMounted = false }
  }, [])

  const getWallet = async () => {
    const data = await fetch("http://localhost:5432/users/1/wallet", {
      headers: { "Content-Type": "application/json"}
    }).then( async (response) => {
      const symbols = await response.json()
      return symbols;
    })
   data.map((symbol) => {
   userCurrenciesFullNames.push(fullCurrencyName(symbol.currency_symbol))
    })

    getArticles(userCurrenciesFullNames);
      
  }

  const getArticles = (userCurrencies, x) => {
  userCurrencies.map((currency) => {
    axios.get(`https://newsapi.org/v2/everything?q="${currency}"&from=${date}&language=en&pageSize=3&apiKey=${process.env.REACT_APP_NEWS}`)
    .then((results) => {
      if (isMounted) {
        for( let x = 0; x < userCurrencies.length; x++) {
          console.log(results.data.articles[x].title) // this console.log is required for WHATEVER REASON otherwise the entire news page breaks
        setArticles(prevState =>
            [...prevState, [results.data.articles[x].title, results.data.articles[x].author, results.data.articles[x].description, results.data.articles[x].url, currency]])
          }
        }
      })
    .catch(err => console.log(err))
    })
  }


  const articleData = articles.map((article, index) => {
    
    if (newArticles.includes(article[0]) === false) {
     return (
      <ArticleListItem
        key={index}
        name={article[0]}
        author={article[1]}
        description={article[2]}
        url={article[3]}
        symbol={article[4]}   
       />
     )

   }
   newArticles.push(article[0]) 
  });

  return (
    <section className='article-page'>
    <h1 className="page-header">News Articles</h1>
    <span className="article-container">
    <div className='article-container-left'>
    {articleData[0]}
    {articleData[2]}
    {articleData[4]}
    {articleData[6]}
    </div>

    <div className='article-container-right'>
    {articleData[1]}
    {articleData[3]}
    {articleData[5]}
    {articleData[7]}
    </div>
    </span>
    </section>
    )
}

export default ArticleList;
