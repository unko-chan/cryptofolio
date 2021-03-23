import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrendingUpIcon from '@material-ui/icons/TrendingUpOutlined';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import NotificationsIcon from '@material-ui/icons/Notifications';

import './nav.scss';
import { PagesSharp } from '@material-ui/icons';

const SideNav = () => {
  let { page } = useParams();

  const NavLink = ({ page }) => {
    const title = page.charAt(0).toUpperCase() + page.slice(1);
    return (
      <Link to={`/${page}`} className="list-item">
        {title}
      </Link>
    );
  };

  const currentPage = useHistory().location.pathname.toLowerCase().slice(1);

  return (
    <div className="side-nav">
      <div className="nav-body">
        <div className="nav-header">
          <span className="header-bold">Crypto</span>folio
        </div>
        <List>
          <div className="link-list">
            <ListItem className={currentPage === 'dashboard' ? 'active' : ''}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <NavLink page="dashboard" />
            </ListItem>
            <ListItem className={currentPage === 'market' ? 'active' : ''}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <NavLink page="market" />
            </ListItem>
            <ListItem className={currentPage === 'rebalance' ? 'active' : ''}>
              <ListItemIcon>
                <DataUsageIcon />
              </ListItemIcon>
              <NavLink page="rebalance" />
            </ListItem>
            <ListItem className={currentPage === 'news' ? 'active' : ''}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <NavLink page="news" />
            </ListItem>
          </div>
        </List>
      </div>
    </div>

    // <div className="side-nav">
    //   <h1 className="nav-title">Cryptofolio</h1>

    //   <div className="nav-links">
    //     <div className="hover-to-show-link">
    //       <a href="#section" className="nav-header"> <AccountBalanceWalletOutlinedIcon /> Dashboard</a>
    //       <span className="nav-subtitle hover-to-show">View your wallet</span>
    //     </div>

    //     <div className="hover-to-show-link">
    //       <a href="#section" className="nav-header"><TrendingUpIcon /> Market</a>
    //       <span className="nav-subtitle hover-to-show">View market charts</span>
    //     </div>

    //     <div className="hover-to-show-link">
    //       <a href="#section" className="nav-header"><ImportContactsOutlinedIcon /> News</a>
    //       <span className="nav-subtitle hover-to-show">The latest crypto news</span>
    //     </div>

    //     <div className="hover-to-show-link">
    //       <a href="#section" className="nav-header"><AttachMoneyOutlinedIcon />  Exchange</a>
    //       <span className="nav-subtitle hover-to-show">Crypto exchange</span>
    //     </div>

    //     <div className="hover-to-show-link">
    //       <a href="#section" className="nav-header"><SettingsOutlinedIcon /> Settings</a>
    //       <span className="nav-subtitle hover-to-show">User settings</span>
    //     </div>
    //   </div>

    //   <span className="nav-logo">
    //     <img src={logo} style={{width: 200, height: 200 }} alt={""}/>
    //   </span>
    // </div>
  );
};

export default SideNav;
