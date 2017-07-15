import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

//import { routes, onAuthChange } from '../imports/routes/routes';
import App from '../imports/ui/App';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  //onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible', true);
  //ReactDOM.render(routes, document.getElementById('app'));
  ReactDOM.render(<App />, document.getElementById('app'));
});
