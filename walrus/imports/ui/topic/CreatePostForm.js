import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


export default class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComplete : false,
            formValue : []
        };
    }

    handleFormSubmit(e) {
        // TODO get userId
        e.preventDefault();
        title = this.title.value;
        post = this.input.value;
        console.log(this.state.formValue);
        const topicList = this.state.formValue;
        // show error if err, show complete if complete
        if(!!post && !!topicList) {
            Meteor.call('posts.insert','jiarui', post, title, topicList);
            this.input.value = '';
            this.setState({
                showComplete: true
            });
            setTimeout(() => { this.props.togglePostForm()}, 1000);
        }
    }
    renderTopicList(){
      return this.props.topicList.map((topic) => {
        if(topic !== this.props.topic){
          return <option key={topic} value={topic}>{topic}</option>
        }
      })
    }

    changeHandler(e){
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      this.setState({formValue: value})
    }
    render() {
        //console.log('Answer text box',this.props.postId);
        return (
            <div>
                {this.state.showComplete ? <h5> Your answer has been submitted </h5> :
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Title here </ControlLabel>
                        <FormControl componentClass='input' placeholder='Your title' inputRef={(ref) => {this.title = ref}} />
                        <ControlLabel>Post content </ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Your post" rows="5" inputRef={(ref) => {this.input = ref}} />
                        </FormGroup>
                      <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>Select topics associated with this post</ControlLabel>
                        <FormControl componentClass="select" multiple value={this.props.topicNameList} onChange={this.changeHandler.bind(this)} inputRef={(ref) => {this.topic = ref}}>
                          <option value={this.props.topic}>{this.props.topic}</option>
                          {this.renderTopicList()}
                        </FormControl>
                      </FormGroup>
                      <Button type="submit">Post</Button>
                      <Button bsStyle="danger" onClick={() => this.props.togglePostForm()}> Cancel </Button>
                  </form>
          }
          </div>
        );
    }
}
