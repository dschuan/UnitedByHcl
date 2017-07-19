import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import {Posts} from '../../api/posts';
import TopicPageItem from './TopicPageItem';

class AllTopicsList extends Component{
  renderPostList(){
    if(this.props.postExists) {
      return this.props.posts.map((post) => {
        let temp2 = temp.content.replace(/\s+/g, '-').toLowerCase();
        let temp3 = temp2.substring(0,20);
        return <TopicPageItem title={temp.title} content={temp.content} author={temp.user} topic={temp.topic} postId={temp._id} key={temp._id} name = {temp3}/>
      })
    }
  }
  render(){
    return (
      <div>{this.props.renderPostList()}</div>
    )
  }
}

export default createContainer(() => {
  const handler = Meteor.subscribe('posts');
  const loading = !handler.ready();
  const post = Posts.find({}, {sort: {lastEdited: -1}}).fetch();
  const postExists = !loading && !!post;

  return { loading,
    post,
    postExists,
    posts: postExists ? post : [],
    };
}, AllTopicsList)
