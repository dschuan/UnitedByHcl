import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Signup from './Signup';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: []
    }
  }

  componentDidMount() {
    this.dashboardTracker = Tracker.autorun(() => {
      let user = Meteor.user();
      this.setState({
        userData: user
      })
    })
  }

  componentWillUnmount() {
    this.dashboardTracker.stop();
  }

  displayHandler() {
    if (this.state.userdata === null) {
        return <Signup />
    } else if (this.state.userdata === undefined) {
      return ( <p>loading</p>)
    } else {
      return (
        <p> User is logged in </p>
      )
    }
  }
  render() {
    return (
      <div className = "page-content">{this.displayHandler()}</div>
    )
  }
}
