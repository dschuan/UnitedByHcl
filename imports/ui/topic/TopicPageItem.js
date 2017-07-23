import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Votes } from '../../api/votes';

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

export default createContainer((props) => {
  const handler = Meteor.subscribe('votes');
  const loading = !handler;
  const parentId = props.postId;
  const rating = (Votes.find({parentId,vote:true}).count() - Votes.find({parentId,vote:false}).count());
  const ratingExists = !!rating && !loading;
  return {
    ...props,
    rating: ratingExists ? rating : 0
  }
}, TopicPageItem);
