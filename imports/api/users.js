import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import { Posts } from './posts';
import { Children } from './children';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  const username = user.username;
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
    let res = Accounts.findUserByUsername(username);
    if (res) {
      throw new Meteor.Error('Username is already taken')
    }
  },
  'adduser'({username, email, password, profile}) {
    Accounts.createUser({username, email, password, profile});
    const temp = Accounts.findUserByUsername(username);
    if(!temp) {
      throw new Meteor.Error('User could not be created');
    }
  },
  'getUserName'() {
    let currentUser = Meteor.users.findOne({_id: this.userId}).fetch();
    if (currentUser.username) {
      return currentUser.username;
    } else {
      throw new Meteor.Error('No username found');
    }
  },
  'user.updateRatings'(username){
    const children = Children.find({username}).fetch();
    const childrenExists = !!children;
    const ratings = [];
    const topicsList = [];
    const finalRatings = [];
    if (childrenExists){

      children.map((child) => {

        let elementId = child._id;
        let topics = [];
        let type = 'answer';
        let rating = child.rating;
        let postId = child.postId;
        let post = Posts.findOne({_id: child.postId},{fields:{ topic: 1}});
        if(!!post){
          topics = post.topic
          topicsList.push(...topics);
        }
        let obj = {elementId, topics, rating, type};
        ratings.push(obj);
      })
      const finalTopicsList = topicsList.filter((it, i, ar) => ar.indexOf(it) === i);

      const finalRatings = finalTopicsList.map((finalTopic) => {
        let sortedRatings = ratings.map((rating) => {
          let topics = rating.topics;
          for (let i of topics) {
            if(i===finalTopic) {
              return rating;
            }
          }
        })
        sortedRatings = sortedRatings.filter((n) => { return n != undefined });
        let sum = 0;
        for (let j of sortedRatings) {
          sum += j.rating;
        }
        return {topic: finalTopic, score: (Math.round((sum / sortedRatings.length) * 100) / 100)}
      })


      console.log(finalRatings);
      Meteor.users.update({username},{
        $set: {
        'profile.ratings': finalRatings
        }
      })
    }
  }
})
