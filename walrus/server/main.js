import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import { Categories } from '../imports/api/categories';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });

  if (Categories.find({}).count() === 0) {
    const nameList = [
      {
        name: 'Aerospace Engineering',
        topic: ['Engine', 'Dynamics']
      },
      {
        name: "Sketching",
        topic: ['Charcoal', 'Pencil']
      },
      {
        name: 'Coding',
        topic: ['C++', 'Cloud Computing', 'Java', 'JavaScript', 'Python']
      },
      {
        name: 'Robotics',
        topic: ['AI Robotics', 'Mechatronics']
      },
      {
        name: 'Materials Engineering',
        topic: ['Process Engineering', 'Materials Thermodynamics']
      }
    ];

    nameList.map((category) => {
      Meteor.call('categories.insert', category.name, category.topic);
    })
    console.log('Inserted data');
  }
});
