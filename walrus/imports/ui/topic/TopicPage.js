import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Route } from 'react-router-dom';

import TopicHeader from '../topics/TopicHeader';
import TopicsList from './TopicsList';

export default class TopicPage extends Component{

  postHandler() {
    return this.props.postExists ? this.props.posts : []
  }

  headingRender() {
    const tmp = this.props.topic.replace(/_/g, ' ');
    return tmp;
  }

  render() {

    return(
      <div>
        <h1 className = "capitalise-text"> {this.headingRender()} </h1>
        <Route path={this.props.match.url} render={(props) => ( <TopicsList postExists={this.props.postExists} topic={this.props.topic} posts={this.postHandler()}/> )} {...this.props}/>
      </div>
    )
  }
}
