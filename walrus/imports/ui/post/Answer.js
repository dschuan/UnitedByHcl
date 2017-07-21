import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Comment from './Comment';
import CommentTextBox from './CommentTextBox';
import PostText from './PostText';

export default class Answer extends Component {
    constructor(props){
      super(props);
      this.state = {
        showTextInput: false
      }
    }
    renderCommentList() {
      if (this.props.commentExists) {
          return this.props.comments.map((comment) => {
            return (
              <ListGroupItem key={comment._id}>
              <Comment comment={comment} key={comment._id}/>
              </ListGroupItem>
            )
        })
      } else {
        return <small> No comments yet </small>
      }
    }
    showCommentInput(){
      this.setState({
        showTextInput: !this.state.showTextInput
      })
    }
    renderCommentField(){
      if(this.state.showTextInput) {
        return (<CommentTextBox showCommentInput={this.showCommentInput.bind(this)} childId={this.props.answer._id} />)
      } else {
        return ( <Button bsStyle='info' onClick={this.showCommentInput.bind(this)}> Comment </Button>)
      }
    }
    render() {
        const { answer } = this.props;
        console.log('Answer', answer);
        console.log('Answer props', this.props);
        return (
            <div>
                <span>
                        Answered by: <button className="btn btn-link">{answer.username} (4.9/5)</button>
                </span>
                <span className="details-small">
                    Updated on date . Post rated {answer.rating}/5.0 .
                </span>
                <span className="details-small">
                    User flair
                </span>
                <PostText text={answer.content} />
                <hr />
                <Panel collapsible header='Comments'>
                  {this.renderCommentList()}
                </Panel>
                {this.renderCommentField()}
            </div>
        );
    }
}

Answer.propTypes = {
    answer : React.PropTypes.object.isRequired
}
