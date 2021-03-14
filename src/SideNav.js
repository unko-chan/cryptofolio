import React from 'react'
import logo from './C_icon.jpeg';

const SideNav = (props) => {

  return (
    <div className="side-nav">
      <span className="nav-title">Cryptofolio</span>
      <img src={logo} />

      <a href="#section" className="nav-header">Dashboard</a>
      <span className="nav-subtitle">View your wallet</span>

      <a href="#section" className="nav-header">Market</a>
      <span className="nav-subtitle">View market charts</span>

      <a href="#section" className="nav-header">News</a>
      <span className="nav-subtitle">The latest crypto news</span>

      <a href="#section" className="nav-header">Exchange</a>
      <span className="nav-subtitle">Crypto exchange</span>

      <a href="#section" className="nav-header">Settings</a>
      <span className="nav-subtitle">User settings</span>

    </div>
  )


}
export default SideNav;