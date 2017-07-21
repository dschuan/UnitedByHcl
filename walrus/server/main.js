import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import express from 'express';
import bodyParser from 'body-parser';

import { setupStackOverflowApi } from '../imports/server/StackOverflowApi';
import { setupQuoraApi } from '../imports/server/QuoraApi';
import { setupRedditApi } from '../imports/server/RedditApi';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import {Categories} from '../imports/api/categories';
import { Posts } from '../imports/api/posts';
import {Children} from '../imports/api/children';
import { Comments } from '../imports/api/comments';

import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));

    setupStackOverflowApi(app);
    setupQuoraApi(app);
    setupRedditApi(app);

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
        title: "Topic_1",
        topic: ["coding_java"]
      },
      {
        name: "Admin",
        content: "Lorem ipsum dolor sit amet2",
        title: "Topic_5",
        topic: ["coding_java"]
      },
      {
        name: "Admin",
        content: "Lorem ipsum dolor sit amet3",
        title: "Topic_2",
        topic: ["coding_java"]
      },
      {
        name: "Tinghao",
        content: "I love bees they are so cool",
        title: "Topic_3",
        topic: ["coding_java"]
      },
      {
        name: "DeSheng",
        content: "Java is awesome and easy everyone should be an expert in it",
        title: "Topic_4",
        topic: ["coding_java"]
      }
    ];
    postList.map((post) => {
      Meteor.call('posts.insert', post.name, post.content, post.title, post.topic);
    })
    console.log('Inserted dummy post data');
  }
});
