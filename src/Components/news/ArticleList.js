import { react, useEffect, useState } from 'react';
import data from '../../data/accounts.json';
import { getBalances } from '../../helpers/pieChartHelper.js';
import { fullCurrencyName } from '../../helpers/transactionHelper';

import ArticleListItem from './ArticleListItem';
import './news.scss'
const axios = require('axios');

let today = new Date()
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const userCurrencies = getBalances(data);

const userCurrenciesFullNames = []
const newArticles = []

Object.keys(userCurrencies).map(key => {
  userCurrenciesFullNames.push(fullCurrencyName(key))
  })


const ArticleList = (props) => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getArticles()
  }, [])

  const getArticles = () => {
  userCurrenciesFullNames.map((currency) => {
    axios.get(`https://newsapi.org/v2/everything?q="${currency}"&from=${date}&language=en&pageSize=1&apiKey=${process.env.REACT_APP_NEWS3}`)
    .then(results => 
      setArticles(prevState =>
          [...prevState, [results.data.articles[0].title, results.data.articles[0].author, results.data.articles[0].description, results.data.articles[0].url]]))
    .catch(err => console.log(err))
    })
  }


  const articleData = articles.map((article, index) => {
    console.log(newArticles.includes(article[0]))
    if (newArticles.includes(article[0]) === false  && !article[0].includes("TROJAN")) {
   

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
      <section className='article-container'>
        <h2>News Articles</h2>
        <div className="article-container">
        {articleData}
        </div>
      </section>
    )
}

export default ArticleList;