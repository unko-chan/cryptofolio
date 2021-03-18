import {react, useState, useEffect } from 'react';
import ArticleListItem from '../news/ArticleListItem'
import './currencydetails.scss'
import { fullCurrencyName } from '../../helpers/transactionHelper';

const axios = require('axios');
const today = new Date()
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


const CurrencyDetails = (props) => {
  const currencyType = props.match.url.slice(1)
  useEffect(() => {
  
  }, [])


    return (
      <h2>Wallet Currancy Details {currencyType}</h2>
    
        )
}
export default CurrencyDetails;



