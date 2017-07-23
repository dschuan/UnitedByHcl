import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
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
  const userRatings = [];
  console.log(username);
  const serverIsDone = false;

  Meteor.call('user.updateRatings',username);

  const user = Meteor.users.findOne({username});
    return {
      ...props,
      username,
      user,
      ratings: userRatings
    }
  })
, UserProfile);
