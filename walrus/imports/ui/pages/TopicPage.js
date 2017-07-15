import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

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
      <div className = "page_content"><h1>{topicName}</h1></div>
    )
  }
}
