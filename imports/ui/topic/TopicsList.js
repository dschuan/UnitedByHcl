import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import TopicPageItem from './TopicPageItem';
import CreatePostForm from './CreatePostForm';
import { Categories } from '../../api/categories';
import { Modal, Well, Button, Grid, Row, Col } from 'react-bootstrap';

class TopicsList extends Component{
  constructor(props){
    super(props)
    this.state={
      showPostForm: false
    }
  }

  togglePostForm(){
    this.setState({
      showPostForm: !this.state.showPostForm
    })
    console.log('State', this.state);
  }

  renderPostList() {
    if (this.props.postExists){
      const posts = this.props.posts;
      console.log(posts);
      return posts.map((temp) => {
        let temp2 = temp.content.replace(/\s+/g, '-').toLowerCase();
        let temp3 = temp2.substring(0,20);
          return <Well bsSize='large' key={temp._id}><TopicPageItem title={temp.title} content={temp.content} author={temp.user} topic={temp.topic} postId={temp._id} key={temp._id} name = {temp3}/></Well>
        })
    }
   else {
     return( <div>Loading</div>)
   }
 }

  renderPostModal() {
    console.log('Modal state', this.state.showPostForm);
    return (<Modal show={this.state.showPostForm}>
      <Modal.Header> <Modal.Title>Create a post</Modal.Title> </Modal.Header>
      <Modal.Body><CreatePostForm togglePostForm={this.togglePostForm.bind(this)} topicList={this.props.topicNameList} topic={this.props.topic}/></Modal.Body>
    </Modal>)
  }

  render(){
    console.log(this.props);
      return (
        <Grid>
        <Row>
        <Col xs={16} md={10}>
        {this.renderPostModal()}
        </Col>
        <Col xs={2} md={1} >
        <Button bsStyle='success' bsSize='large' onClick={this.togglePostForm.bind(this)}>Add Post</Button>
        </Col>
        </Row>
        <Row>
        <Col xs={16} md={10}>
        {this.renderPostList()}
        </Col>
        </Row>
        </Grid>
      )
  }
}

export default createContainer((props) => {
  console.log(props);
  const handler = Meteor.subscribe('categories');
  const categories = Categories.find({}).fetch();
  const topicList = [];
  categories.map((category) => {
    let catList = category.topics;
    catList.map((temp) => {
      topicList.push(temp);
    })
  })
  const topicNameList = topicList.map((topic) => {
    return (topic.name);
  })
  const loading = !handler.ready();
  const listExists = !loading && !!topicNameList;
  console.log(topicNameList);
  return {
    ...props,
    topicNameList: listExists ? topicNameList : []
  }
},TopicsList);
