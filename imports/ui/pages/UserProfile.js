import React, { Component } from 'react';
import { Grid, Well } from 'react-bootstrap';
export default class UserProfile extends Component{

  renderUserInfo(){
    const ratings = this.props.user.profile.ratings;
    return ratings.map((rating) => {
      return(
        <Well key={rating.topic}>
        <h4>{rating.topic}</h4>
        <hr />
        {rating.score}
        </Well>
      )
    })
    console.log(ratings);

  }

  renderDefault(){
    if(this.props.user.profile.ratings === 0){
      return <Well> User has not posted any answers yet </Well>
    }
  }
  render(){
    console.log(this.props)
    return(
      <Grid>
        {this.renderDefault()}
        {this.renderUserInfo()}
      </Grid>
    )
  }
}
