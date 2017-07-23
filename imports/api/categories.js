import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';

export const Categories = new Mongo.Collection('categories');
if (Meteor.isServer) {
  Meteor.publish('categories', function () {
    return Categories.find({});
  });
}
Meteor.methods({
  'categories.insert'(name, topics) {
    const id = "cat-" + shortid.generate();
    let topicObjs = topics.map((topic) => {
      let topicid = id + "_" + topic.replace(/\s+/g, '-');
      return ({
        name: topic,
        _id: topicid
      })
    });

    Categories.insert({
      _id: id,
      topics: topicObjs,
      name
    })
  },
  'categories.findTopic'(topicId) {
    return Categories.find({}).fetch();
  }
})
