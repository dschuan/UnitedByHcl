import React, { Component } from 'react';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem, Button, Glyphicon, Tooltip, OverlayTrigger} from 'react-bootstrap';
import Comment from './Comment';
import CommentTextBox from './CommentTextBox';
import PostText from './PostText';
import { Votes } from '../../api/votes';
import { Link } from 'react-router-dom';

export default class Answer extends Component {
    constructor(props){
      super(props);
      this.state = {
        showTextInput: false,
        showDelete:false,
        hasEndorsed: false
      }
    }

    endorse(){

      if (!this.state.hasEndorsed){
        let endorseExist = false;
        for (let endorsement of this.props.endorsements) {
          if (endorsement.username === Meteor.user().username) {
            endorseExist = true;
          }
        }

        console.log(endorseExist);
        if(!endorseExist) {
          Meteor.call('endorsements.insert',this.props.answer._id);
          this.setState({hasEndorsed: true});
        } else {
        Meteor.call('endorsements.remove', this.props.answer._id);
        this.setState({hasEndorsed: false});
      }

    }}
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
      Meteor.call('user.updateRatings',this.props.answer.username);
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
      console.log(this.props.answer.username);
      Meteor.call('user.updateRatings',this.props.answer.username);
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

    renderEndorsementButton(){
      if(Meteor.user().profile.type==='supercontributor'){
        return (<Button bsStyle='default' onClick={this.endorse.bind(this)}>Endorse  <Glyphicon glyph='thumbs-up'/></Button>)
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

    renderTime(){
      const editTime = this.props.answer.lastEdit;
      let currentTime = Math.round((new Date().getTime()) / 1000);
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

    renderTooltip(){
      let tooltipStr = 'By: ';
      if (this.props.endorsements.length < 4){
        for (let end of this.props.endorsements) {
          tooltipStr += end.username + ', ';
        }
      } else {
        for (let i = 0; i < 4 ; i++) {
          tooltipStr += this.props.endorsements[i].username + ', ';
        }
      }
      tooltipStr = tooltipStr.slice(0, tooltipStr.length - 2);
      return <Tooltip id='tooltip'>{tooltipStr}</Tooltip>
    }

    renderEndorsements(){
      const endorsementList = this.props.endorsements.map((endorsement) => {
        return endorsement.username;
      })
      if(endorsementList.length !== 0) {
        return(
          <OverlayTrigger placement='top' overlay={this.renderTooltip()}>
            <Button><Glyphicon glyph='star-empty'/></Button>
          </OverlayTrigger>
        )
      }
    }

    componentDidMount(){
      this.props.endorsements.map((endorsement) =>{
        if(endorsement.username === Meteor.user().username) {
          this.setState({
            hasEndorsed: true
          })
        } else {
          this.setState({
            hasEndorsed: false
          })
        }
      })
    }
    render() {
        console.log('Answer props', this.props);
        console.log('Answer state', this.state);
        return (
            <Grid>
              <Row>
                <Col xs={6} md={3}>
                <span>
                        Answered by: <Link to={('/users/' + this.props.answer.username)}><Button className="btn btn-link">{this.props.answer.username} </Button></Link>
                </span>
                </Col>
                <Col xs={6} md={3}>
                <span className="details-small">
                    Updated on {this.renderTime()} . Post rated {this.props.answer.rating}
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
                <Col xs={6} md={4}>
                  <PostText text={this.props.answer.content} />
                </Col>
                <Col xs={6} md={2}>
                  {this.renderEndorsements()}
                </Col>
                <Col xs={6} md={2}>
                  {this.renderEndorsementButton()}
                </Col>
              </Row>
                <hr />
              <Row>
                  <Col xs={18} md={10}>
                  <Panel bsStyle='default' collapsible header='Comments'>
                    {this.renderCommentList()}
                  </Panel>
                  {this.renderCommentField()}
                  </Col>
              </Row>
            </Grid>
        );
    }
}

Answer.propTypes = {
    answer : React.PropTypes.object.isRequired
}
