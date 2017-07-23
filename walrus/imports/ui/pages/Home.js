import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid, Col, Row } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import App from '../App';
import AppHeaderBar from '../AppHeaderBar';
import AppSideBar from '../AppSideBar';
import Public from './Public';
import Authenticated from './Authenticated';
import TopicsMain from './TopicsMain';
import Signup from '../Signup';
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';
import PostPage from '../containers/PostPageContainer';
import Login from '../Login';

const Home = homeProps => (
  <Router>
    <div className="App">
      <AppHeaderBar {...homeProps} />

      <Grid>
        <Row>
        <Col xs={6} md={3}>
        <AppSideBar {...homeProps}/>
        </Col>
        <Col xs={12} md={6}>
        <Switch>
          <Authenticated exact name="home" path="/" component={Dashboard} {...homeProps} />
          <Authenticated path="/topics" component={TopicsMain} {...homeProps} />
          <Authenticated exact path="/posts/:_pid" component={PostPage} {...homeProps }/>
          <Public path="/signup" component={Signup} {...homeProps} />
          <Route path="/login" component={Login} {...homeProps} />
          <Route component={NotFound} />
        </Switch>
        </Col>
        </Row>
      </Grid>
    </div>
  </Router>
);

Home.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};

const composer = (props) => {
  const loggingIn = Meteor.loggingIn();
  return ({
    loggingIn,
    authenticated: !loggingIn && !!Meteor.user(),
  });
};

export default createContainer(composer, Home);
