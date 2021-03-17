import React from "react";
import { Paper, Box } from '@material-ui/core'


export default function ArticleListItem(props) {

  return (
    <Box component={Paper} elevation={3}>
      <div className="article-name">{props.name}</div>
    <div className="article-author">Written by: {props.author}</div><br/>
    <div className="article-description">{props.description}</div>
     
      <a href='#' onClick={(e) => {
      e.preventDefault();
      window.location.href=props.url;
      }}>Click for full story</a>
      </Box>
  );
}