import {react, useState, useEffect } from 'react';
import ArticleListItem from '../news/ArticleListItem'
import './currencydetails.scss'
import { fullCurrencyName } from '../../helpers/transactionHelper';

const axios = require('axios');
const today = new Date()
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

const CurrencyDetails = (props) => {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
      getArticles()
    }, [])
  
    const getArticles = () => {
    
      axios.get(`https://newsapi.org/v2/everything?q="bitcoin"&from=${date}&language=en&pageSize=2&apiKey=${process.env.REACT_APP_NEWS}`)
        .then(response => setArticles(response.data.articles))
        .catch(err => console.log(err));
    
    }
  
    
    const articleData = articles.map((article) => {
      return (
        <ArticleListItem
         name={article.title}
         author={article.author}
         description={article.description}
         url={article.url} 
        />
      )
    })
  
    return (
      <section className="currency-breakdown">
        <div className="news-container">{articleData}</div>
        <div className="information-container"></div>
      </section>
        )
}
export let variable;
export default CurrencyDetails;



