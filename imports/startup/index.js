import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Home from '../ui/pages/Home';

Meteor.startup(() => {
  render(<Home />, document.getElementById('react-root'));
});
