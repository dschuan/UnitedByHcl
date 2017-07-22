import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Tracker } from 'meteor/tracker';
import { Grid, Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { Posts } from '../../api/posts';
import CategoryLabel from './CategoryLabel';
import PostText from './PostText';
import QuestionContent from './QuestionContent';
import { Votes } from '../../api/votes';

class QuestionPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpvoted: false,
            isDownvoted: false,
        };
    }

    upvote(){
      console.log("upvote");
      console.log(this.props.vote);
      const parentId = this.props.post._id;
      //TO-DO: Replace with
      //const user = Meteor.user().username;
      const user = this.props.post.user;
      if(this.props.vote === 0){
        Meteor.call('votes.insert', parentId, user, true);
      } else if(this.props.vote > 0){
        Meteor.call('votes.update', parentId, user, true);
      } else {
        console.log('upvote failed');
      }

    }
    downvote(){
      console.log("downvote");
      const parentId = this.props.post._id;
      //const user = Meteor.user().username;
      const user = this.props.post.user;
      if(this.props.vote === 0){
        Meteor.call('votes.insert', parentId, user, false);
      } else if(this.props.vote > 0){
        Meteor.call('votes.update', parentId, user, false);
      } else {
        console.log('downvote failed');
      }
    }

    renderCategory() {
        // TODO: render category either based on _id or category name
        //console.log('QuestionPost', this.state);
        if(this.state.hasPost) {
            return this.props.post.topic.map((topic) => {
                const label = topic.replace(/_/g, ' ');
                const url = '/topics/' + topic;
                return( <Button bsStyle='info' bsSize='xsmall' key={topic}>
                        <Link to={url} key={topic} >{label}</Link>
                        </Button>);
            })
        }
    }

    renderQuestionContent() {
      if(this.props.hasPost) {
        return <QuestionContent postId={this.props.post._id} post={this.props.post} />
      }
    }

    renderTimePosted() {
      const editTime = this.props.post.lastEdited;
      const currentTime = Math.round((new Date().getTime()) / 1000);
      const timeSinceEdit = currentTime - editTime;
      if (timeSinceEdit < 60) {
        return ( <span>{timeSinceEdit} seconds</span>)

      } else if (timeSinceEdit >= 60 && timeSinceEdit < 3600) {
        timeInMin = Math.floor(timeSinceEdit / 60);
        return (<span>{timeInMin} minutes</span>)

      } else if (timeSinceEdit >= 3600 && timeSinceEdit < 216000) {
        timeInHr = Math.floor(timeSinceEdit / 3600);
        return(<span>{timeInHr} hours </span>)

      } else {
        timeInDay = Math.floor(timeSinceEdit / 216000);
        return(<span>{timeInDay} days</span>)
      }
    }

    render() {
     console.log('Question post' , this.props);
     console.log('Question post state', this.state);
        return (
            <Grid className="post-right">
                <Row className="show-grid">
                    <Col md={9}>
                        <div className="question-content">
                          <ButtonToolbar>
                            {this.renderCategory()}
                          </ButtonToolbar>
                            <span className="details-small">
                               answer(s):
                            </span>
                            <span className="details-small">
                              rating: {this.props.post.rating}
                            </span>
                        </div>
                    </Col>
                    <Col md={6}>
                    <ButtonGroup>
                      <Button bsStyle='success' bsSize='small' onClick={this.upvote.bind(this)}> Upvote </Button>
                      <Button bsStyle='danger' bsSize='small' onClick={this.downvote.bind(this)}> Downvote </Button>
                    </ButtonGroup>
                    </Col>
                    <Col md={3} className="no-left-pad">
                        <span className="details-small">
                           edited {this.renderTimePosted()} ago by {' '}
                           <Button bsStyle="link" className="inline-link">{this.props.post.user}</Button>
                        </span>
                    </Col>
                </Row>
                <Row>
                    {this.renderQuestionContent()}
                    <hr />
                </Row>
            </Grid>
        );
    }
}

export default createContainer((props) => {
  //TO-DO: when implement accounts, use below:
  //const user = Meteor.user().username;
  const user = props.post.user;
  console.log(user);
  const id = props.post._id;
  console.log(id);
  const handler = Meteor.subscribe('votes');
  const loading = !handler.ready();
  const votes = Votes.find({parentId: id, user}).count();
  console.log(votes);
  const voteExist = !!votes;
  return {
    ...props,
    vote: votes
  }
}, QuestionPost)
