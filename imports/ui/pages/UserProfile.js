import React, { Component } from 'react';
import { Grid, Well, PageHeader } from 'react-bootstrap';
export default class UserProfile extends Component{

  renderUserInfo(){
    const ratings = this.props.user.profile.ratings;
    return ratings.map((rating) => {
      return(
        <div>
            <Well key={rating.topic}>
            <h4>{rating.topic.replace("_"," : ")}</h4>
            <p>{rating.score}</p>
            </Well>
        </div>
      )
    })
    console.log(ratings);

  }

  renderDefault(){
    if(this.props.user.profile.ratings.length === 0){
      return <Well> {this.props.username} has not posted any answers yet </Well>
  } else {
      return <PageHeader> {this.props.username+"  "}<small>Profile </small> </PageHeader>
  }
  }
  render(){
    console.log(this.props)
    return(
      <Grid className="answer-container">
        {this.renderDefault()}
        {this.renderUserInfo()}
      </Grid>
    )
  }
}
