import React from "react";
import { Paper, Box, Grid } from '@material-ui/core'
import { styled } from '@material-ui/core/styles';




export default function ArticleListItem(props) {

  return (
    
    <Box component={Paper} elevation={3} width="35%" >
      <div className="article-name">{props.name}</div>
    <div className="article-author">Written by: {formatAuthor(props.author)}</div><br/>
    <div className="article-description">{props.description}</div>
     
      <a href='#' onClick={(e) => {
      e.preventDefault();
      window.open(props.url);
      }}>Click for full story</a>
      </Box>
     
  );
}

const formatAuthor = (author) => {
  if (!author) {
    return 'Anonymous'
  } else {
    return author
  }
}