import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import QuestionPost from '../post/QuestionPost';
import AnswerList from '../post/AnswerList';

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        console.log('post page', this.props.location.pathname)
        // extract postId from url
        // const postId = this.props.location.pathname.replace('/', '');
        this.state = {
            haveAnswers: false,
            haveSuggestions: true,
            postId : 'post-Bkx8XF5vSZ'
        }
    }

    handleAnswerToggle(haveAnswers) {
        this.setState({
            haveAnswers
        });
    }

    renderAnswers() {
        if (this.state.haveAnswers) {
            return <AnswerList postId={this.state.postId}/>;
        } else if (this.state.haveSuggestions) {
            return (
            <div className="text-center">
                 Nobody has posted any answers here yet. Meanwhile, here are some suggested answers from elsewhere.
            </div>
            );
        } else {
            return (
            <div className="text-center">
                Nobody has posted any answers here yet. Be the first!
            </div>
            );
        }
    }

    render() {
        console.log('Post Page', this.props);
        return (
            <div className="col-sm-12 col-sm-offset-1 post-container">
                <h3 className="post-header">{this.state.haveAnswers ? 'Established Post' : 'Newly Posted'}</h3>
                <QuestionPost postId={this.state.postId} answerToggle={this.handleAnswerToggle.bind(this)}/>
                {this.renderAnswers()}
                <div> Suggestion Area </div>
                <div className="col-sm-4">
                        Quora
                </div>
                <div className="col-sm-4">
                        Stackoverflow
                </div>
                <div className="col-sm-4">
                        Reddit
                </div>
            </div>
        );
    }
}
