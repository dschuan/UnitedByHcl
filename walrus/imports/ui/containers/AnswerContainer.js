import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import Answer from '../post/Answer';
import { Comments } from '../../api/comments';
import { Votes } from '../../api/votes';

export default createContainer((props) => {
  console.log('AnswerContainer', props);
  const handler = Meteor.subscribe('comments');
  const handler2 = Meteor.subscribe('votes');

  const child = props.answer;
  const childId = child._id;
  const user = props.thisUser.username;

  console.log(user);
  console.log(childId);

  const comments = Comments.find({childId}, {sort: {lastEdited: -1}}).fetch();
  const votes = Votes.find({parentId: childId, user}).count();

  const loading = !handler.ready() && !handler2.ready();

  console.log(votes);
  const voteExist = !!votes;
  console.log(voteExist);
  console.log(comments);
  const commentExists = !loading && !!comments;

  return { answer: child,
    votes: votes,
    childId,
    loading,
    commentExists,
    comments: commentExists ? comments : [],
    };

}, Answer);
