import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import TopicPageItem from './TopicPageItem';
import { Route } from 'react-router-dom';
import PostPage from '../pages/PostPage';

import TopicHeader from '../topics/TopicHeader';
import TopicList from '../topics/TopicList';

export default class TopicPage extends Component{

  renderPostList() {
    if (this.props.postExists){
      const posts = this.props.posts;
      console.log(posts);
      return posts.map((temp) => {
        let temp2 = temp.content.replace(/\s+/g, '-').toLowerCase();
        let temp3 = temp2.substring(0,20);
          return <TopicPageItem content={temp.content} author={temp.user} topic={this.props.topic} key={temp._id} name = {temp3}/>
        })
    }
   else {
     return( <div>Loading</div>)
   }
  }
  render(){
      const url = "/topics/" + this.props.topic + "/:postId";
      return (
        <div>
        {this.props.topic}
        <Route path={url} component={PostPage}/>
        {this.renderPostList()}
        </div>
      )
  }
}
