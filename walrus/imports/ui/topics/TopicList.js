import React, { Component } from 'react'
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import TopicListItem from './TopicListItem';
import { Posts } from '../../api/posts';

export default class TopicList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            topicList: []
        };
    }

    componentDidMount() {
        const { topicId } = this.props;
        this.topicTracker = Tracker.autorun(() => {
            Meteor.subscribe('posts');
            console.log(topicId);
            const posts = Posts.find({category: topicId}).fetch();
            this.setState({
                topicList: posts
            });
            console.log('topicList', this.state.topicList);
        });
    }

    componentWillUnmount() {
        this.topicTracker.stop();
    }

    renderListItem() {
        return this.state.topicList.map((post) => {
            return <TopicListItem key={post._id} post={post}/>;
        })
    }

    render() {
        return (
            <div>
                {this.renderListItem()}
            </div>
        );
    }
}
