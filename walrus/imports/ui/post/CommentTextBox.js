import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


export default class CommentTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComplete : false
        };
    }

    handleFormSubmit(e) {
        // TODO get userId
        e.preventDefault();
        comment = this.input.value;
        console.log('submitting comment', this.input.value, this.props.childId);
        // show error if err, show complete if complete
        if(comment) {
            Meteor.call('comments.insert', comment, this.props.childId, 'jiarui');
            this.input.value = '';
            this.setState({
                showComplete: true
            });
        }
    }

    render() {
        //console.log('Answer text box',this.props.postId);
        return (
            <div>
                {this.state.showComplete ? <h5> Comment Submitted </h5> :
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Type your comment...</ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Your Answer" rows="5"  inputRef={(ref) => {this.input = ref}}/>
                      </FormGroup>
                      <Button type="submit">Comment</Button>
                      <Button bsStyle="danger" onClick={() => this.props.showCommentInput()}> Cancel </Button>
                  </form>
          }
          </div>
        );
    }
}
