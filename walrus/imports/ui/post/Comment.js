import React, { Component } from 'react';
import { Button, MenuItem, Grid, Row, Col } from 'react-bootstrap';

export default class Comment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      adminPanelVisible: false,
    }
  }

  opAdminPanelRender(){
    if(this.props.comment.user === this.props.thisUser.username){
    return (<Button  id='comment-admin' bsStyle='info' bsSize='xsmall' title='Admin'>
             Delete
            </Button>)
      }
  }
  render(){
    console.log('Comment' + this.props)
    return(
      <Grid>
        <Row>
          <Col xs={10} md={6}>
            {this.props.comment.content}
          </Col>
          <Col xs={6} md={3} />
          <Col xs={2}>
            {this.opAdminPanelRender()}
          </Col>
        </Row>

        <Row>
          <Col xs={4} md={2}>
            <small> by {this.props.comment.user} </small>
          </Col>
          <Col xs={4} md={2} />
          <Col xs={4} md={2}>
            <small> rating: {this.props.comment.rating}</small>
          </Col>
        </Row>
      </Grid>
    )
  }
}
