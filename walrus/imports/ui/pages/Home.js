import React, { PropTypes } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Public from './Public';
import Authenticated from './Authenticated';
import Signup from '../Signup';
import NotFound from '../NotFound';

const Home = homeProps => (
  <Router>
    <div className="App">
      <AppHeaderBar {...homeProps} />
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Authenticated exact path="/documents" component={Documents} {...appProps} />
          <Authenticated exact path="/documents/new" component={NewDocument} {...appProps} />
          <Authenticated exact path="/documents/:_id" component={ViewDocument} {...appProps} />
          <Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...appProps} />
          <Public path="/signup" component={Signup} {...appProps} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
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
