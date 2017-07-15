import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Categories from '../../api/categories';
import TopicPage from '../pages/TopicPage';


export default createContainer(({match}) => {
  console.log(match.params);
  const topic = match.params._id;
  return { topic };

}, TopicPage);
