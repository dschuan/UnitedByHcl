import React from 'react';
import { Link } from 'react-router-dom';

const TopicPageItem = (props) => {
  const url = "/posts/" + props.postId;
  console.log(props);
  return (
      <div>
        <Link to={url}>{props.title}</Link>
        <p> By: {props.author} </p>
      </div>
    )
}

export default TopicPageItem;
