import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import TopicPage from '../containers/TopicPageContainer';
import TopicsList from '../topic/TopicsList';

const TopicsMain = (props) => {
  console.log(props);
  const newUrl = props.match.path + "/:_id";
  return (
      <div>
      <Switch>
        <Route exact path = "/topics" component={TopicsList} {...props} />
        <Route exact path = {newUrl} component={TopicPage} {...props}/>
      </Switch>
    </div>
  )
}

export default TopicsMain;
