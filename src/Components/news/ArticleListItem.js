import React from "react";
import { Paper, Box, } from '@material-ui/core'
import OpenInNewSharpIcon from '@material-ui/icons/OpenInNewSharp';




export default function ArticleListItem(props) {

  return (
    
    <Box component={Paper} width="100%" className='article-list-container'>
      <div>{props.symbol}</div>
      <div className="article-name">{props.name}</div><br/>
    <div className="article-description">{props.description}</div><br/>
      <a href='#' className='article-url' onClick={(e) => {
        e.preventDefault();
        window.open(props.url);
      }}><OpenInNewSharpIcon/></a>
      <div className="article-author">{formatAuthor(props.author)}</div>
      </Box>
     
  );
}

const formatAuthor = (author) => {
  if (!author || author.includes('https')) {
    return 'Anonymous'
  } else {
    return author
  }
}