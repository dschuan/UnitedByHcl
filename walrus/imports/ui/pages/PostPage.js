import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import QuestionPost from '../post/QuestionPost';
import AnswerList from '../post/AnswerList';
import { PageHeader, Button, SplitButton, MenuItem, Panel } from 'react-bootstrap';

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        console.log('Post Page Props', props);
        console.log('post page', this.props.location.pathname)
        // extract postId from url
        // const postId = this.props.location.pathname.replace('/', '');
        this.state = {
            haveSuggestions: true,
            post : props.posts,
            isOp: false
        }
    }

    toggleOp() {
      const tmp = !this.state.isOp;
      this.setState({isOp: tmp})
    }

    renderAnswers() {
        if (this.props.childExists) {
            return <AnswerList children={this.props.children}/>;
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
        if (this.props.post.length === 0) {
            return null;
        }
        return (
            <div className="col-sm-12 col-sm-offset-1 post-container">
                <PageHeader>
                {this.props.post[0].content.title} <br/>
                <small>{this.state.haveAnswers ? 'Established Post' : 'Newly Posted'}</small> 
                </PageHeader>
                <Panel> {this.props.post[0].content.detail} </Panel>
                {this.renderOPOptions()}
                <QuestionPost post={this.props.post[0]} hasAnswer={this.props.childExists} hasPost={this.props.postExists}/>
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
