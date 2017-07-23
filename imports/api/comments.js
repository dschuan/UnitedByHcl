import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';

export const Comments = new Mongo.Collection('comments');
if (Meteor.isServer) {
  Meteor.publish('comments', function () {
    return Comments.find({});
  });
}
Meteor.methods({
  'comments.insert'(content, childId, username) {
      let id = "com-" + shortid.generate();
      let lastEdited = Math.round(( new Date().getTime()) / 1000);
    Comments.insert({
      _id: id,
      content,
      lastEdited,
      user: username,
      childId
    })
  },

  'comments.edit'(_id, content) {
    let lastEdited = Math.round(( new Date().getTime()) / 1000);
    new SimpleSchema({
      content: {
        type: String
      }
    }).validate({ content });

    Comments.update({ _id }, {
      $set: {
        content,
        lastEdited
      }
    })
  },
  'comments.delete'(_id) {
    Comments.remove(_id)
  }
});
