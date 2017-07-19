import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import QuestionPost from '../post/QuestionPost';
import AnswerList from '../post/AnswerList';
import { PageHeader, Button, SplitButton, MenuItem, Panel } from 'react-bootstrap';

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log('post page', this.props.location.pathname)
        // extract postId from url
        // const postId = this.props.location.pathname.replace('/', '');
        this.state = {
            haveAnswers: props.childExists,
            haveSuggestions: true,
            post : props.posts,
            isOp: false
        }
    }

    handleAnswerToggle(haveAnswers) {
        this.setState({
            haveAnswers
        });
    }

    toggleOp() {
      const tmp = !this.state.isOp;
      this.setState({isOp: tmp})
    }

    renderAnswers() {
        if (this.state.haveAnswers) {
            return <AnswerList postId={this.state.post._id}/>;
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

    renderOPOptions(){
      if(this.state.isOp) {
        return (
          <SplitButton id='post-admin-panel' title='Options' bsStyle='success'>
            <MenuItem id='edit-post' eventKey="1">Edit this post</MenuItem>
            <MenuItem id='delete-post' eventKey="2">Delete this post</MenuItem>
          </SplitButton>
        )
      } else {
        return <div></div>
      }
    }

    render() {
        console.log('Post Page', this.props);
        return (
            <div className="col-sm-12 col-sm-offset-1 post-container">
                <PageHeader>
                {this.props.posts.title} <br/>
                <small>{this.state.haveAnswers ? 'Established Post' : 'Newly Posted'}</small> <br/>
                </PageHeader>
                <Panel> {this.props.posts.content} </Panel>
                {this.renderOPOptions()}
                <QuestionPost post={this.props.posts} hasAnswer={this.props.childExists} hasPost={this.props.postExists} answerToggle={this.handleAnswerToggle.bind(this)}/>
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
                <Button bsSize='large' bsStyle='info'>Give an answer </Button>
                <div>
                <Button bsSize='small' bsStyle='warning' onClick={this.toggleOp.bind(this)}> To toggle if visiting user is OP or not </Button>
                </div>
            </div>
        );
    }
}
