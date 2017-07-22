import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import TopicPage from '../topic/TopicPage';
import { Posts } from '../../api/posts';
import { Children } from '../../api/children';
import PostPage from '../pages/PostPage';

export default createContainer(({match}) => {
  console.log(match);
  const postId = match.params._pid;
  const postHandler = Meteor.subscribe('posts');
  const childHandler = Meteor.subscribe('children');
  const loading = !postHandler.ready()
  const post = Posts.find({_id: postId}).fetch();
  const children = Children.find({postId});
  const user = Meteor.user();
  console.log(post);
  console.log(children);
  const postExists = !loading && !!post;
  const childExists = !(children.count() === 0);
  return { loading,
    post,
    postExists,
    childExists,
    user,
    children: childExists ? children : [],
    posts: postExists ? post[0] : {},
    };

}, PostPage);
