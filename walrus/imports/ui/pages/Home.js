import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import App from '../App';
import AppHeaderBar from '../AppHeaderBar';
import AppSideBar from '../AppSideBar';
import Public from './Public';
import Authenticated from './Authenticated';
import TopicPage from './TopicPage';
import Signup from '../Signup';
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';

const Home = homeProps => (
  <Router>
    <div className="App">
      <AppHeaderBar {...homeProps} />
      <AppSideBar {...homeProps} />
      <Grid>
        <Switch>
          <Route exact name="home" path="/" component={Dashboard} />
          <Authenticated exact path="/topics/:id" component={TopicPage} {...homeProps} />
          <Public path="/signup" component={Signup} {...homeProps} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </div>
  </Router>
);

App.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const composer = (props) => {
  const loggingIn = Meteor.loggingIn();
  return ({
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default createContainer(composer, Home);
