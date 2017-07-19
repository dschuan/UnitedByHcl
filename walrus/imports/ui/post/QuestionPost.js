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
            post: {},
            hasAnswer:false,
            hasPost:false
        };
    }

    componentDidMount(){
      this.postTracker = Tracker.autorun(()=> {
        this.setState({
          post: this.props.post,
          hasAnswer: this.props.hasAnswer,
          hasPost: this.props.hasPost
        })
      })
    }

    componentWillUnmount(){
      this.postTracker.stop();
    }
    renderQuestion() {
      return <PostText text={this.state.post.title}/>
    }

    renderCategory() {
        // TODO: render category either based on _id or category name
        console.log('QuestionPost', this.state);
        if(this.state.hasPost) {
            return this.state.post.topics.map((topic) => {
                return <CategoryLabel category={topic} key={topic}/>;
            })
        }
    }

    renderQuestionContent() {
      if(this.state.hasPost) {
        return <QuestionContent content={this.state.post.content} postId={this.state.post._id}/>
      }
    }

    render() {
      console.log(this.props);
        return (
            <div className="question-content">
                {this.renderQuestion()}
                {this.renderCategory()}
                <span className="details-small">
                   answer(s) . 39 views
                </span>
                <hr />
                {this.renderQuestionContent()}
            </div>
        );
    }
}
