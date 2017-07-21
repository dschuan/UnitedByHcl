import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';

export const Children = new Mongo.Collection('children');
if (Meteor.isServer) {
  Meteor.publish('children', function () {
    return Children.find({});
  });
}

Meteor.methods({
  'children.insert'(content, username, postId) {
    let id = "child-" + shortid.generate();
    let lastEdit = Math.round(( new Date().getTime()) / 1000);
    Children.insert({
      _id: id,
      content,
      username,
      rating: 0,
      lastEdit,
      postId});
  },
  'children.rate'(_id, rate) {
    new SimpleSchema({
      rate: {
        type: Number,
        min: -2,
        max: 2
      }
    }).validate({ rate });

    Children.update({  _id }, {
      $inc: {
        rating: rate
      }
    })
  },
  'children.edit'(_id, content) {
    new SimpleSchema({
      content: {
        type: String
      }
    }).validate({ content });
    let lastEdit = Math.round(( new Date().getTime()) / 1000);
    Children.update({ _id }, {
      $set: {
        content,
        lastEdit
      }
    })
  },
  'children.delete'(_id) {
    Children.remove(_id)
  }
});
