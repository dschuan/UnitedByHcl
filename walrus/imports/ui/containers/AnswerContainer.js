import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { createContainer } from 'meteor/react-meteor-data';
import Answer from '../post/Answer';
import { Comments } from '../../api/comments';


export default createContainer((props) => {
  console.log('AnswerContainre', props);
  const handler = Meteor.subscribe('comments');
  const child = props.answer;
  const childId = child._id;
  const loading = !handler.ready();
  const comments = Comments.find({childId}, {sort: {lastEdited: -1}}).fetch();
  console.log(comments);
  const commentExists = !loading && !!comments;

  return { answer: child,
    childId,
    loading,
    commentExists,
    comments: commentExists ? comments : [],
    };

}, Answer);
