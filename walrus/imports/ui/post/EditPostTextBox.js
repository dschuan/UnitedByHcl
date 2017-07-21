import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


export default class AnswerTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComplete : false
        };
    }

    handleFormSubmit(e) {
        // TODO get userId
        e.preventDefault();
        post = this.input.value;
        console.log('submitting post', this.input.value);
        // show error if err, show complete if complete
        if(post) {
            Meteor.call('posts.edit', this.props.postId, post);
            this.setState({
                showComplete: true
            });
            setTimeout(() => { this.props.hideEditBox()}, 1000);
        }
    }

    render() {
        console.log('EditPost text box',this.props);
        return (
            <div>
                {this.state.showComplete ? <h5> Post edited </h5> :
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Edit your post: </ControlLabel>
                        <FormControl componentClass="textarea" rows="5" defaultValue={this.props.initialCont} inputRef={(ref) => {this.input = ref}}/>
                      </FormGroup>
                      <Button type="submit">Edit Post</Button>
                      <Button bsStyle="danger" onClick={() => this.props.hideEditBox()}> Cancel </Button>
                  </form>
          }
          </div>
        );
    }
}
