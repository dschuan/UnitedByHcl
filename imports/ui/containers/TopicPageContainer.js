import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import TopicPage from '../topic/TopicPage';
import { Posts } from '../../api/posts';
import { Votes } from '../../api/votes';

export default createContainer(({match}) => {
  const topic = match.params._id;
  const handler = Meteor.subscribe('posts');
  const handler2 = Meteor.subscribe('votes');
  const loading = !handler.ready() || !handler2.ready();
  const post = Posts.find({topic}, {sort: {lastEdited: -1}}).fetch();
  console.log(post);
  const postExists = !loading && !!post;

  return { topic, loading,
    post,
    postExists,
    posts: postExists ? post : [],
    };

}, TopicPage);
