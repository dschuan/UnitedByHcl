import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import TopicPage from '../containers/TopicPageContainer';
import AllTopicsList from '../topic/AllTopicsList';

const TopicsMain = (props) => {
  console.log(props);
  const newUrl = props.match.path + "/:_id";
  console.log(newUrl);
  return (
      <div className="topic-content">
      <Switch>
        <Route exact path = "/topics" component={AllTopicsList} {...props} />
        <Route exact path = {newUrl} component={TopicPage} {...props}/>
      </Switch>
    </div>
  )
}

export default TopicsMain;
