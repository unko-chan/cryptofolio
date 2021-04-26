import {react, useState, useEffect } from 'react';
import ArticleListItem from '../news/ArticleListItem'
import { fullCurrencyName } from '../../helpers/transactionHelper';
import { useParams, useHistory } from 'react-router-dom';
import './currencydetails.scss'

const axios = require('axios');


const CurrencyDetails = (props) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    articleRequest(fullCurrencyName(currency))
  }, [])

  const articleRequest = (cryptoName) => {
    axios.get(`https://newsapi.org/v2/everything?q=${cryptoName}&pageSize=2&apiKey=${process.env.REACT_APP_NEWS}`)
      .then(results => results.data.articles)
      .then(results => setArticles(prevState =>
        [...prevState, results[0].title, results[0].author, results[0].description, results[0].url]))
  }

  const {currency} = useParams();
  const { back } = useHistory();
  
  const articleData = 
    
        <ArticleListItem
          name={articles[0]}
          author={articles[2]}
          description={articles[1]}
          url={articles[3]}   
        />
    return (
      <main>
      <h2>Wallet Currancy Details {fullCurrencyName(currency)} </h2>
    <section className="news-article">{articleData}</section>
    </main>
        )
}
export default CurrencyDetails;



