import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import {DropdownButton, MenuItem } from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

export default class UserProfileIcon extends Component {

  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }
    logout(){
      console.log('logout');
      Meteor.logout();
    }

    toggleRedirect(){
      this.setState({
        redirect: true
      })
    }

    redirect(){
      if(this.state.redirect){
        return( <Redirect to='/' />)
      }
    }
    urlRender(){
      if (Meteor.user()) {
        return ('/users/' + Meteor.user().username)
      } else {
        return ('/')
      }
    }
    render() {
        return (
          <div>
          <DropdownButton bsStyle='info' title='Profile' id='profile-drop-down' pullRight>
            <MenuItem eventKey='1' ><Link to={this.urlRender()}>Go to Profile</Link></MenuItem>
            <MenuItem eventKey='2' onClick={this.logout.bind(this)}>Logout</MenuItem>
          </DropdownButton>
          {this.redirect()}
          </div>
        );
    }
}
