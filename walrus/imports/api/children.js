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
    Children.insert({
      _id: id,
      content,
      username,
      rating: 0,
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

    Children.update({ _id }, {
      $set: {
        content
      }
    })
  }
});
