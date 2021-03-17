import React from "react";
import { Paper } from '@material-ui/core'

export default function ArticleListItem(props) {

  return (
    <Paper elevation={3} className="article-container">
      <div className="article-name">{props.name}</div>
    <div className="article-author">{props.author}</div>
    <div className="article-description">{props.description}</div>
      <a href='{props.url}'>{props.url}</a>
      </Paper>
  );
}