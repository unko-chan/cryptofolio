import React from 'react'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import TrendingUpIcon from '@material-ui/icons/TrendingUpOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import logo from './C_icon_without_white.png';

import './Nav.scss'

const SideNav = (props) => {

  return (
    <div className="side-nav">
      <span className="nav-title">Cryptofolio</span>

      <div className="nav-links">
      <div className="hover-to-show-link">
        <a href="#section" className="nav-header"> <AccountBalanceWalletOutlinedIcon /> Dashboard</a>
        <span className="nav-subtitle hover-to-show">View your wallet</span>
      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header"><TrendingUpIcon /> Market</a>
        <span className="nav-subtitle hover-to-show">View market charts</span>
      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header"><ImportContactsOutlinedIcon /> News</a>
        <span className="nav-subtitle hover-to-show">The latest crypto news</span>
      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header"><AttachMoneyOutlinedIcon />  Exchange</a>
        <span className="nav-subtitle hover-to-show">Crypto exchange</span>

      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header"><SettingsOutlinedIcon /> Settings</a>
        <span className="nav-subtitle hover-to-show">User settings</span>
      </div>
      </div> 

      <span className="nav-logo">
       <img src={logo} style={{width: 200, height: 200 }} alt={""}/> 
       </span>
    </div>
  )


}
export default SideNav;