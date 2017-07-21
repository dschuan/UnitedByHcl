import React, { Component } from 'react';
import { SplitButton } from 'react-bootstrap';
export default class Comment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      adminPanelVisible: false,
      isUser: false
    }
  }
  showAdminPanel(){
    //TO-DO: implement function to determine if user editing comment = user logged in
    if(this.state.isUser) {
      this.setState({
        adminPanelVisible: !this.state.adminPanelVisible
      })
    }
  }
  opAdminPanelRender(){
    if (this.state.adminPanelVisible){
    return ( <SplitButton bsStyle='info' bsSize='xsmall' title='Admin'>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </SplitButton>)
      }
  }
  render(){
    console.log('Comment' + this.props)
    return(
      <div onMouseOver={this.showAdminPanel.bind(this)}>
      {this.opAdminPanelRender()}
      {this.props.comment.content} <hr/>
      <small> by user </small>
      <span> rating: {this.props.comment.rating}</span>
      </div>
    )
  }
}
