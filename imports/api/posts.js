import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';
import { Children } from './children';
import { Comments } from './comments';
import { Votes } from './votes';

export const Posts = new Mongo.Collection('posts');
if (Meteor.isServer) {
  Meteor.publish('posts', function () {
    return Posts.find({});
  });
}

Meteor.methods({
  'posts.insert'(username, content, title, topic) {
    //topic refers to topicId
    let id = "post-" + shortid.generate();
    let date = Math.round(( new Date().getTime()) / 1000);
    Posts.insert({
      _id: id,
      user: username,
      lastEdited: date,
      rating: 0,
      title,
      content,
      topic
    })
  },

  'posts.edit'(_id, content) {
    new SimpleSchema({
      content: {
        type: String
      }
    }).validate({ content });
    let lastEdited = Math.round(( new Date().getTime()) / 1000);
    Posts.update({ _id }, {
      $set: {
        lastEdited,
        content
      }
    })
  },

  'posts.delete'(_id) {
    //remove post
    Posts.remove(_id);
    //remove children
    children=Children.find({postId: _id}).fetch();
    if(!!children) {
        children.map((child) => {
          childId = child._id;
          comments=Comments.find({childId}).fetch();
          if(!!comments){
            comments.map((comment) =>{
              //remove comments
              commentId = comment._id;
              Comments.remove(commentId);
            })
          }
          //remove child
          Children.remove(childId);
      })
    }
    //remove votes
    Votes.remove({parentId: _id});


  },

  'posts.listByDate'() {
    return Posts.find({}).fetch();
  }
});
