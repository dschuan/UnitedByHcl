import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Modal, PageHeader, Button, DropdownButton, MenuItem, Panel, Well, ButtonToolbar, Clearfix } from 'react-bootstrap';

import QuestionPost from '../post/QuestionPost';
import AnswerList from '../post/AnswerList';
import EditPostTextBox from '../post/EditPostTextBox';
import SuggestionContainer from '../post/SuggestionContainer';

export default class PostPage extends Component {
    constructor(props) {
        super(props);
        console.log('Post Page Props', props);
        console.log('post page', this.props.location.pathname)
        // extract postId from url
        // const postId = this.props.location.pathname.replace('/', '');
        this.state = {
            haveSuggestions: true,
            post : {},
            isEditingPost: false,
            showWarning: false,
            redirect: false,
            user: null
        }
    }

    toggleOp() {
      const tmp = !this.state.isOp;
      this.setState({isOp: tmp})
    }

    toggleSuggestions(){
      this.setState({
        haveSuggestions: !this.state.haveSuggestions
      })
    }

    toggleEditPost(){
      this.setState({
        isEditingPost: !this.state.isEditingPost
      })
    }

    toggleShowWarning(){
      this.setState({
        showWarning: !this.state.showWarning
      })
    }
    componentDidMount(){
          this.setState({
            post: this.props.posts,
            user: this.props.user
        })
    }

    renderAnswers() {
        if (this.props.childExists) {
            return <AnswerList thisUser={this.props.user} children={this.props.children}/>;
        } else if (this.state.haveSuggestions) {
            return (
            <div className="text-center">
                 Nobody has posted any answers here yet. Meanwhile, here are some suggested answers from elsewhere.
                 {this.renderSuggestions()}
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

    editPost(){
      console.log('edit-post');
      this.toggleEditPost();
    }
    deletePost(){
      console.log('delete-post');
      Meteor.call('posts.delete',this.props.posts._id);
      this.setState({
        redirect: !this.state.redirect
      })
    }

    renderOPOptions(){
      if(this.props.posts.user === this.props.user.username) {
        return (
          <DropdownButton id='post-admin-panel' title='Options' bsStyle='success' >
            <MenuItem id='edit-post' onSelect={this.editPost.bind(this)} eventKey="1">Edit this post</MenuItem>
            <MenuItem id='delete-post' onSelect={this.toggleShowWarning.bind(this)} eventKey="2">Delete this post</MenuItem>
          </DropdownButton>
        )
      } else {
        return <div></div>
      }
    }

    renderSuggestions(){
      if (this.state.haveSuggestions) {
        return (
          <SuggestionContainer title={this.props.posts.title}/>
        )
      }
    }

    renderPostContent(){
      if(this.state.isEditingPost){
        return <Well><EditPostTextBox hideEditBox={this.toggleEditPost.bind(this)} postId={this.props.posts._id} initialCont={this.props.posts.content}/></Well>
      } else {
        return <Well>{this.props.posts.content}</Well>
      }
    }

    renderDeleteWarn(){
        return(
          <Modal autoFocus={true} className='modal-container' bsSize='large' show={this.state.showWarning} backdrop={true}>
            <Modal.Header>
            <Modal.Title>
              Delete this post and all its constituents?
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ButtonToolbar>
              <Button bsStyle='danger' bsSize='large' onClick={this.deletePost.bind(this)}>Delete</Button>
              <Button bsStyle='primary' bsSize='large' onClick={this.toggleShowWarning.bind(this)}>Cancel</Button>
            </ButtonToolbar>
            </Modal.Body>
          </Modal>
        )
      }

      renderRedirect(){
        if(this.state.redirect){
          console.log(this.props);
          const topic = this.props.posts.topic[0];
          const link = '/topics/' + topic;
          return <Redirect to={link}/>
        }
      }

    render() {
        console.log('Post Page', this.props);
        console.log('Post page state', this.state);
        if (this.props.post.length === 0) {
            return null;
        }
        return (
            <div className="col-sm-12 col-sm-offset-1 post-container">
                {this.renderRedirect()}
                <PageHeader>
                {this.props.posts.title} <br/>
                <small className="pageHeader">{this.state.haveAnswers ? 'Established Post' : 'Newly Posted'}</small>
                {this.renderOPOptions()}
                </PageHeader>
                {this.renderDeleteWarn()}
                {this.renderPostContent()}
                <QuestionPost post={this.props.posts} hasAnswer={this.props.childExists} hasPost={this.props.postExists}/>
                {this.renderAnswers()}
                <Button bsSize='small' bsStyle='link' onClick={this.toggleSuggestions.bind(this)}> Switch off Suggestions </Button>
                <div>
                </div>
            </div>
        );
    }
}
