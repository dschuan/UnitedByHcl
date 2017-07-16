import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Posts } from '../../api/posts';
import CategoryLabel from './CategoryLabel';
import PostText from './PostText';
import QuestionContent from './QuestionContent';

export default class QuestionPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        console.log('QuestionPost', this.props);
        const _id = this.props.postId;
        this.postTracker = Tracker.autorun(() => {
            Meteor.subscribe('posts');
            const posts = Posts.find({_id }).fetch();
            this.setState({
                posts
            });
            if (this.state.posts.length !== 0) {
                if (this.state.posts[0].answer_count > 0) {
                    this.props.answerToggle(true);
                } else {
                    this.props.answerToggle(false);
                }
            }
        });
    }

    componentWillUnmount() {
        console.log('component will unmount, QuestionPost');
        this.postTracker.stop();
    }

    renderQuestion() {
        if (this.state.posts.length !== 0) {
            return <PostText text={this.state.posts[0].content.title}/>
        } else {
            return null;
        }
    }

    renderCategory() {
        // TODO: render category either based on _id or category name
        console.log('QuestionPost', this.props);
        if(this.state.posts.length !== 0) {
            return this.state.posts[0].category.map((category) => {
                return <CategoryLabel category={category} key={category}/>;
            })
        }
    }

    renderQuestionContent() {
        if (this.state.posts.length !== 0) {
            return <QuestionContent content={this.state.posts[0].content.detail} postId={this.props.postId}/>
        }
    }

    render() {
        return (
            <div className="question-content">
                {this.renderQuestion()}
                {this.renderCategory()}
                <span className="details-small">
                     {this.state.posts.length !== 0 ? this.state.posts[0].answer_count : 0} answer(s) . 39 views
                </span>
                <hr />
                {this.renderQuestionContent()}
            </div>
        );
    }
}

QuestionPost.propTypes = {
    postId : React.PropTypes.string.isRequired,
    answerToggle: React.PropTypes.func.isRequired
};
