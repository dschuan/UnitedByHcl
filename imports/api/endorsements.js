import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import SimpleSchema from 'simpl-schema';
import { Children } from './children';

export const Endorsements = new Mongo.Collection('endorsements');
if (Meteor.isServer) {
  Meteor.publish('endorsements', function () {
    return Endorsements.find({});
  });
}

Meteor.methods({
  'endorsements.insert'(childId){
    let id = "end-" + shortid.generate();
    if(Meteor.user().profile.type === 'supercontributor'){
      const username = Meteor.user().username;
      if (Endorsements.find({username, childId}).count() === 0){
        Endorsements.insert({
          username,
          childId
        })
      } else {
        throw new Meteor.Error("Endorsement already exists");
      }
    } else {
      throw new Meteor.Error("You do not have the security clearance to perform this action");
    }
  },
  'endorsements.remove'(childId){
    username = Meteor.user().username;
    Endorsements.remove({username, childId})
  }
})
