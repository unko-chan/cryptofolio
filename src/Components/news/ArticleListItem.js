import React from "react";
import { Paper, Box } from '@material-ui/core'


export default function ArticleListItem(props) {
  return (
    <div>
      <div className="article-name">{props.name}</div>
    <div className="article-author">Written by: {formatAuthor(props.author)}</div><br/>
    <div className="article-description">{props.description}</div>
     
      <a href='#' onClick={(e) => {
      e.preventDefault();
      window.open(props.url);
      }}>Click for full story</a>
      </div>
  );
}

const formatAuthor = (author) => {
  console.log('is it running')
  if (!author) {
    return 'Anonymous'
  } else {
    return author
  }
}