import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Grid, Row, Col, Button } from 'react-bootstrap'

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

    renderCategory() {
        // TODO: render category either based on _id or category name
        //console.log('QuestionPost', this.state);
        if(this.state.hasPost) {
            return this.state.post.category.map((topic) => {
                return <CategoryLabel category={topic} key={topic}/>;
            })
        }
    }

    renderQuestionContent() {
      if(this.state.hasPost) {
        return <QuestionContent postId={this.state.post._id} post={this.state.post} />
      }
    }

    render() {
     console.log('Question post' , this.props);
        return (
            <Grid className="post-right">
                <Row className="show-grid">
                    <Col md={9}>
                        <div className="question-content">
                            {this.renderCategory()}
                            <span className="details-small">
                               answer(s) . 39 views
                            </span>
                        </div>
                    </Col>
                    <Col md={3} className="no-left-pad">
                        <span className="details-small">
                           posted on {this.state.post.lastEdited} by {' '}
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
