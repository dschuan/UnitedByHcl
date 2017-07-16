import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';


export const Comments = new Mongo.Collection('comments');

Meteor.methods({
  'comments.insert'(content, childId, username) {
      let id = "com-" + shortid.generate();
    Comments.insert({
      _id: id,
      content,
      rating: 0,
      user: username,
      childId
    })
  },
  'comments.rate'(_id, rate) {
    new SimpleSchema({
      rate: {
        type: Number,
        min: -2,
        max: 2
      }
    }).validate({ rate });

    Comments.update({ _id }, {
      $inc: {
        rating: rate
      }
    })
  },
  'comments.edit'(_id, content) {
    new SimpleSchema({
      content: {
        type: String
      }
    }).validate({ content });

    Comments.update({ _id }, {
      $set: {
        content
      };
    })
  },
  'comments.delete'(_id {
    Comments.remove(_id);
  }
})
