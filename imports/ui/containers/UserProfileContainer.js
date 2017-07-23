import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import UserProfile from '../pages/UserProfile';
import { Comments } from '../../api/comments';
import { Children } from '../../api/children';
import { Posts } from '../../api/posts';
import { Votes } from '../../api/votes';

export default createContainer(((props) => {
  console.log(props);
  const username = props.match.params._uid;
  console.log(username);
  const handler = Meteor.subscribe('children');

  const children = Children.find({username}).fetch();
  const loading = !handler.ready();
  const childrenExists = !!children;
  const ratings = [];
  const topicsList = [];
  const finalRatings = [];
  if (!loading && !!childrenExists){

    children.map((child) => {

      let elementId = child._id;
      let topics = [];
      let type = 'answer';
      let rating = child.rating;
      let postId = child.postId;
      let handler2 = Meteor.subscribe('posts');
      let loading2 = handler2.ready();
      let post = Posts.findOne({_id: child.postId},{fields:{ topic: 1}});
      if(!loading2 && !!handler2){
        topics = post.topic
        topicsList.push(...topics);
      }
      console.log(topics);
      let obj = {elementId, topics, rating, type};
      ratings.push(obj);
      console.log(ratings);
    })
    console.log(topicsList);
    const finalTopicsList = topicsList.filter((it, i, ar) => ar.indexOf(it) === i);
    console.log(finalTopicsList);

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
      console.log(sortedRatings);
      let sum = 0;
      for (let j of sortedRatings) {
        sum += j.rating;
      }
      console.log(sum);
      return {topic: finalTopic, score: (Math.round((sum / sortedRatings.length) * 100) / 100)}
    })

    
    console.log(finalRatings);
    Meteor.users.update({username},{
      $set: {
      'profile.$.ratings': ratings
      }
    })
  }

    return {
      ...props,
      username,
      ratings,
    }
  })
, UserProfile);
