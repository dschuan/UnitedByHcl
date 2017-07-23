import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Route } from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';
import TopicHeader from '../topics/TopicHeader';
import TopicsList from './TopicsList';

export default class TopicPage extends Component{

  postHandler() {
    return this.props.postExists ? this.props.posts : []
  }

  headingRender() {
    const tmp = this.props.topic.replace(/_/g, ' ');
    const tmp2 = tmp.split(' ');
    const category = tmp2[0].replace(/-/g, ' ');
    const title = tmp2[1].replace(/-/g,' ');
    return (
      <PageHeader className='capitalise-text'>{category} <small>{title}</small></PageHeader>
    );
  }

  render() {

    return(
      <div>
        {this.headingRender()}
        <Route path={this.props.match.url} render={(props) => ( <TopicsList postExists={this.props.postExists} topic={this.props.topic} posts={this.postHandler()}/> )} {...this.props}/>
      </div>
    )
  }
}
