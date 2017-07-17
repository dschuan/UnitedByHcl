import React from 'react';
import { Link } from 'react-router-dom';

const TopicPageItem = (props) => {
  const url = "/topics/" + props.topic + "/" + props.name
  return (
      <div>
        <Link to={url}>{props.content}</Link>
        <p> By: {props.author} </p>
        <p>{props.topic}</p>
      </div>
    )
}

export default TopicPageItem;
