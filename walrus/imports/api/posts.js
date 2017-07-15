import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
  'posts.insert'(username, content, category) {
    let id = "post-" + shortid.generate();
    let date = new Date();
    Posts.insert({
      user: username,
      lastEdited: date,
      rating: 0,
      content,
      category
    })
  },
  'posts.rate'(_id, rate) {
    new SimpleSchema({
      rate: {
        type: Number,
        max: 2,
        min: -2
      }
    }).validate({ rate });

    Posts.update({ _id }, {
      $inc: {
        rating: rate
      }
    })
  },
  'posts.edit'(_id, content) {
    new SimpleSchema({
      content: {
        type: String
      }
    }).validate({ content });

    Posts.update({ _id }, {
      $set: {
        lastEdited: new Date();
        content
      }
    })
  }
})
