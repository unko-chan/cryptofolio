import React from "react";
import { Paper, Box } from '@material-ui/core'


export default function ArticleListItem(props) {

  return (
    <Box component={Paper} elevation={3}>
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