import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    },
    username: {
      type: String
    }
  }).validate({ email, username });

  return true;
});

Meteor.methods({
  'userExists'(username) {
    let res = Meteor.users.findOne({username: username}).fetch();
    if (res) {
      throw new Meteor.Error('Username is already taken')
    }
  },
  'getUserName'() {
    let currentUser = Meteor.users.findOne({_id: this.userId}).fetch();
    if (currentUser.username) {
      return currentUser.username;
    } else {
      throw new Meteor.Error('No username found');
    }
  }
})
