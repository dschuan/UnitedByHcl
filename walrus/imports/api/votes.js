import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';
import { Posts } from './posts';
import { Children } from './children';

export const Votes = new Mongo.Collection('votes');
if (Meteor.isServer) {
  Meteor.publish('votes', function () {
    return Votes.find({});
  });
}
Meteor.methods({
  'votes.insert'(parentId, username, vote) {
      let id = "vo-" + shortid.generate();
      new SimpleSchema({
        vote: {
          type: Boolean,
        }
      }).validate({ vote });
    Votes.insert({
      _id: id,
      parentId,
      user: username,
      vote
    })
    const rating = (Votes.find({parentId, vote:true}).count() - Votes.find({parentId, vote: false}).count());

    Posts.update({_id: parentId},{
      $set:{rating}
    });

    Children.update({_id: parentId},{
      $set:{rating}
    })
  },
  'votes.update'(parentId, username, vote) {
    Votes.update({parentId, user: username},{
      $set:{
        vote
      }
    })
    rating = (Votes.find({parentId, vote: true}).count()) - (Votes.find({parentId, vote: false}).count());
    Posts.update({_id: parentId},{
      $set:{rating}
    });

    Children.update({_id: parentId},{
      $set:{rating}
    });
  }
})
