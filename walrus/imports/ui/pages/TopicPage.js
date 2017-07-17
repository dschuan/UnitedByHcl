import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import TopicHeader from '../topics/TopicHeader';
import TopicList from '../topics/TopicList';

export default class TopicPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      topic: []
    }
  }
  render(){
    const topicid = this.props.topic.split("_")
    const topicName = this.props.topic.replace(topicid[0] + '_', '');

    return (
        <div className="col-sm-12 col-sm-offset-1 post-container">
              {topicName}
        </div>
      )
  }
}
