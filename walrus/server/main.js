import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import 'whatwg-fetch';


import '../imports/api/users';
import { Links } from '../imports/api/links';
import {Categories} from '../imports/api/categories';
import { Posts } from '../imports/api/posts';
import {Children} from '../imports/api/children';
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
      let catname = category.name;
      topics = category.topic.map((topic) => {
         return (catname + '_' + topic).replace(/\s+/g, '-').toLowerCase();
      });
      console.log(topics);
      Meteor.call('categories.insert', category.name, topics);
    });
    console.log('Inserted category data');
  }

  if (Posts.find({}).count() === 0) {

    const postList = [
      {
        name: "Admin",
        content: "Lorem ipsum dolor sit amet",
        topic: "coding_java"
      },
      {
        name: "Admin",
        content: "Lorem ipsum dolor sit amet2",
        topic: "coding_java"
      },
      {
        name: "Admin",
        content: "Lorem ipsum dolor sit amet3",
        topic: "coding_java"
      },
      {
        name: "Tinghao",
        content: "I love bees they are so cool",
        topic: "coding_java"
      },
      {
        name: "DeSheng",
        content: "Java is awesome and easy everyone should be an expert in it",
        topic: "coding_java"
      }
    ];
    postList.map((post) => {
      Meteor.call('posts.insert', post.name, post.content, post.topic);
    })
    console.log('Inserted dummy post data');
  }
});
