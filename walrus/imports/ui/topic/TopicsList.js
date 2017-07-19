import React, { Component } from 'react';
import TopicPageItem from './TopicPageItem';

export default class TopicsList extends Component{

  renderPostList() {
    if (this.props.postExists){
      const posts = this.props.posts;
      console.log(posts);
      return posts.map((temp) => {
        let temp2 = temp.content.replace(/\s+/g, '-').toLowerCase();
        let temp3 = temp2.substring(0,20);
          return <TopicPageItem title={temp.title} content={temp.content} author={temp.user} topic={temp.topic} postId={temp._id} key={temp._id} name = {temp3}/>
        })
    }
   else {
     return( <div>Loading</div>)
   }
  }


  render(){
    console.log(this.props);
      return (
        <div>
        {this.renderPostList()}
        </div>
      )
  }
}
