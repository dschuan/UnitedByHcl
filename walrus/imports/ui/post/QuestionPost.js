import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Posts } from '../../api/posts';
import CategoryLabel from './CategoryLabel';
import PostText from './PostText';

export default class QuestionPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        console.log('trying to subscribe to posts');
        console.log('QuestionPost', this.props);
        this.postTracker = Tracker.autorun(() => {
            Meteor.subscribe('posts');
            const posts = Posts.find({_id : 1234567}).fetch();
            this.setState({
                posts
            });
            console.log('new post' , this.state);
        });
    }

    componentWillUnmount() {
        console.log('component will unmount, QuestionPost');
        this.postTracker.stop();
    }

    renderQuestion() {
        if (this.state.posts.length !== 0) {
            return <PostText text={this.state.posts[0].content}/>
        } else {
            return null;
        }
    }

    renderCategory() {
        // TODO: render category either based on _id or category name
        console.log('QuestionPost', this.props);
        if(this.state.posts.length !== 0) {
            return this.state.posts.category.map((category))
        }
    }

    render() {
        return (
            <div>
                {this.renderQuestion()}
                <CategoryLabel category='python' />
            </div>
        );
    }
}
