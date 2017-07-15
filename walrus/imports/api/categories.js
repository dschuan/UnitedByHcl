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
    let id = "cat-" + shortid.generate();
    Categories.insert({
      _id: id,
      topics,
      name
    })
  }
})
