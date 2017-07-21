import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Grid, Row, Col, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
            hasPost:false,
            isUpvoted: false,
            isDownvoted: false
        };
    }

    upvote(){
      console.log("upvote");
    }
    downvote(){
      console.log("downvote");
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

    renderCategory() {
        // TODO: render category either based on _id or category name
        //console.log('QuestionPost', this.state);
        if(this.state.hasPost) {
            return this.state.post.topic.map((topic) => {
                const label = topic.replace(/_/g, ' ');
                const url = '/topics/' + topic;
                return( <Button bsStyle='info' bsSize='xsmall'>
                        <Link to={url} >{label}</Link>
                        </Button>);
            })
        }
    }

    renderQuestionContent() {
      if(this.state.hasPost) {
        return <QuestionContent postId={this.state.post._id} post={this.state.post} />
      }
    }

    renderTimePosted() {
      const editTime = this.state.post.lastEdited;
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
                              rating: {this.state.post.rating}
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
                           posted {this.renderTimePosted()} ago by {' '}
                           <Button bsStyle="link" className="inline-link">{this.state.post.user}</Button>
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
