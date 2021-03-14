import React from 'react'


const SideNav = (props) => {

  return (
    <div className="side-nav">
      <span className="nav-title">Cryptofolio</span>
      {/* <img src={logo} /> */}
      
      <div className="nav-links">
      <div className="hover-to-show-link">
        <a href="#section" className="nav-header">Dashboard</a>
        <span className="nav-subtitle hover-to-show">View your wallet</span>
      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header">Market</a>
        <span className="nav-subtitle hover-to-show">View market charts</span>
      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header">News</a>
        <span className="nav-subtitle hover-to-show">The latest crypto news</span>
      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header">Exchange</a>
        <span className="nav-subtitle hover-to-show">Crypto exchange</span>

      </div>

      <div className="hover-to-show-link">
        <a href="#section" className="nav-header">Settings</a>
        <span className="nav-subtitle hover-to-show">User settings</span>
      </div>
      </div> 
    </div>
  )


}
export default SideNav;