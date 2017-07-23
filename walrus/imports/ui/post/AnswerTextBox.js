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
        answer = this.input.value;
        console.log('submitting post', this.input.value);
        name= Meteor.user().username;
        // show error if err, show complete if complete
        if(answer) {
            Meteor.call('children.insert', answer, name, this.props.postId);
            this.input.value = '';
            this.setState({
                showComplete: true
            });
            console.log(' timeout started');
            setTimeout(() => { this.props.hideTextArea()}, 1000);
        }
    }

    render() {
        console.log('Answer text box state',this.state);
        return (
            <div>
                {this.state.showComplete ? <h5> Your answer has been submitted </h5> :
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Your Answer Here: </ControlLabel>
                        <FormControl componentClass="textarea" placeholder="Your Answer" rows="5"  inputRef={(ref) => {this.input = ref}}/>
                      </FormGroup>
                      <Button type="submit">Post</Button>
                      <Button bsStyle="danger" onClick={() => this.props.hideTextArea()}> Cancel </Button>
                  </form>
          }
          </div>
        );
    }
}
