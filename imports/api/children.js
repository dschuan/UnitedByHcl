import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';
import { Comments } from './comments';

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
      rating: 0,
      content,
      username,
      lastEdit,
      postId});
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
    Children.remove(_id);
    commments = Comments.find({childId: _id}).fetch();
    if(!!comments)
    {
      comments.map((comment) => {
        Comments.remove(comment._id)
      })
    }
  }
});
