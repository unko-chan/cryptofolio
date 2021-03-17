import { ArtTrackOutlined } from '@material-ui/icons';
import { react, useEffect, useLayoutEffect, useState } from 'react';

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

Object.keys(userCurrencies).map(key => {
  userCurrenciesFullNames.push(fullCurrencyName(key))
  })

const ArticleList = (props) => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getArticles()
    console.log()
  }, [])

  const getArticles = () => {
  userCurrenciesFullNames.map((currency) => {
    axios.get(`https://newsapi.org/v2/everything?q='${currency}'&from=${date}&language=en&pageSize=2&apiKey=${process.env.REACT_APP_NEWS3}`)
    .then(results => setArticles(prevState =>
      [...prevState, results.data.articles]
    ))
    .catch(err => console.log(err))
    })
  }

  
  const articleData = articles.map((article) => {
    if (article.length > 0) {
      return (
        <ArticleListItem
          name={article[0].title}
          author={article[0].author}
          description={article[0].description}
          url={article[0].url} 
        />
      ) 
    }
  })

  return (
      <section className='article-container'>
        <div className='currency-title'>News stories for you:</div>
        <div className="article-container">
        {articleData}
        </div>
      </section>
    )
}

export default ArticleList;