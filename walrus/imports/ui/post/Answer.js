import React, { Component } from 'react';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import Comment from './Comment';
import CommentTextBox from './CommentTextBox';
import PostText from './PostText';
import { Votes } from '../../api/votes';

export default class Answer extends Component {
    constructor(props){
      super(props);
      this.state = {
        showTextInput: false,
        showDelete:false
      }
    }
    upvote(){
      console.log("upvote");
      console.log(this.props.votes);
      const parentId = this.props.answer._id;
      //TO-DO: Replace with
      const user = this.props.thisUser.username;
      if(this.props.votes === 0){
        Meteor.call('votes.insert', parentId, user, true);
      } else if(this.props.votes > 0){
        Meteor.call('votes.update', parentId, user, true);
      } else {
        console.log('upvote failed');
      }
    }

    downvote(){
      console.log("upvote");
      console.log(this.props.votes);
      const parentId = this.props.answer._id;
      //TO-DO: Replace with
      const user = this.props.thisUser.username;
      if(this.props.votes === 0){
        Meteor.call('votes.insert', parentId, user, false);
      } else if(this.props.votes > 0){
        Meteor.call('votes.update', parentId, user, false);
      } else {
        console.log('upvote failed');
      }
    }
    renderCommentList() {
      if (this.props.commentExists) {
          return this.props.comments.map((comment) => {
            return (
              <ListGroupItem key={comment._id}>
              <Comment comment={comment} thisUser={this.props.thisUser} key={comment._id}/>
              </ListGroupItem>
            )
        })
      } else {
        return <ListGroupItem key={this.props._id}> <small>No comments yet</small> </ListGroupItem>
      }
    }
    showCommentInput(){
      this.setState({
        showTextInput: !this.state.showTextInput
      })
    }
    renderCommentField(){
      if(this.state.showTextInput) {
        return (<CommentTextBox thisUser={this.props.thisUser} showCommentInput={this.showCommentInput.bind(this)} childId={this.props.answer._id} />)
      } else {
        return ( <Button bsStyle='info' onClick={this.showCommentInput.bind(this)}> Comment </Button>)
      }
    }

    renderDelete(){
      if(this.props.thisUser.username === this.props.answer.username ){
        return (<Button bsStyle='default' bsSize='xsmall' onClick={()=>{Meteor.call('children.delete',this.props.answer._id)}}>Delete</Button>)
      }
    }
    render() {
        console.log('Answer props', this.props);
        return (
            <Grid>
              <Row>
                <Col xs={6} md={3}>
                <span>
                        Answered by: <button className="btn btn-link">{this.props.answer.username} (4.9/5)</button>
                </span>
                </Col>
                <Col xs={6} md={3}>
                <span className="details-small">
                    Updated on date . Post rated {this.props.answer.rating} .
                </span>
                </Col>
                <Col xs={6} md={3}>
                <span className="details-small">
                    User flair
                </span>
                <Col xs={6} md={3}>
                <Button bsSize='small' bsStyle='success' onClick={this.upvote.bind(this)}>Upvote</Button>
                <Button bsSize='small' bsStyle='danger' onClick={this.downvote.bind(this)}>Downvote</Button>
                </Col>
                </Col>
                <Col xs={6} md={3}>
                {this.renderDelete()}
                </Col>
              </Row>
              <Row>
                <PostText text={this.props.answer.content} />
              </Row>
                <hr />
              <Row>
                  <Panel bsStyle='default' collapsible header='Comments'>
                    {this.renderCommentList()}
                  </Panel>
                  {this.renderCommentField()}
                  <Col xs={6} md={3} />
              </Row>
            </Grid>
        );
    }
}

Answer.propTypes = {
    answer : React.PropTypes.object.isRequired
}
