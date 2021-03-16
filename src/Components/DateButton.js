import React from 'react';

export default function DateButton(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
