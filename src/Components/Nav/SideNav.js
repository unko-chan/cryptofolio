import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TrendingUpIcon from '@material-ui/icons/TrendingUpOutlined';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
              <Link to="dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
              </Link>
              {/* <NavLink page="dashboard" className="nav-link"/> */}
              <span className="nav-link">Dashboard</span>
            </ListItem>

            <ListItem className={currentPage === 'market' ? 'active' : ''}>
              <Link to="market">
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
              </Link>
              {/* <NavLink page="market" className="nav-link"/> */}
              <span className="nav-link">Market</span>
            </ListItem>
            <ListItem className={currentPage === 'rebalance' ? 'active' : ''}>
              <Link to="rebalance">
                <ListItemIcon>
                  <DataUsageIcon />
                </ListItemIcon>
              </Link>
              {/* <NavLink page="rebalance" className="nav-link"/> */}
              <span className="nav-link">Rebalance</span>
            </ListItem>
            <ListItem className={currentPage === 'news' ? 'active' : ''}>
              <Link to="news">
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
              </Link>
              {/* <NavLink page="news" className="nav-link"/> */}
              <span className="nav-link">News</span>
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
