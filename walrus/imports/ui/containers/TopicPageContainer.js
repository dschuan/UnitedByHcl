import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import TopicPage from '../topic/TopicPage';
import { Posts } from '../../api/posts';


export default createContainer(({match}) => {
  console.log(match.params);
  const topic = match.params._id;
  const handler = Meteor.subscribe('posts');
  const loading = !handler.ready();
  const post = Posts.find({topic}, {sort: {lastEdited: -1}}).fetch();
  const postExists = !loading && !!post;

  return { topic, loading,
    post,
    postExists,
    posts: postExists ? post : [],
    };

}, TopicPage);
