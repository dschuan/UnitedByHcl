import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

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
        answer = this.refs.answer.value;
        console.log('submitting post', this.refs.answer.value);
        // show error if err, show complete if complete
        if(answer) {
            Meteor.call('children.insert', answer, 'jiarui', this.props.postId);
            this.refs.answer.value = '';
            this.setState({
                showComplete: true
            });
            setTimeout(() => { this.props.hideTextArea()}, 3000);
        }
    }

    render() {
        console.log('Answer text box',this.props.postId);
        return (
            <div>
                {this.state.showComplete ? <h5> Your answer has been submitted </h5> :
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="form-group">
                      <label>Your Answer Here: </label>
                      <textarea className="form-control" rows="5" id="answer" ref="answer"></textarea>
                      <button type="submit" className="btn">Post</button>
                      <button type="button" className="btn btn-danger" onClick={() => this.props.hideTextArea()}>Cancel</button>
                  </div>
              </form>
          }
          </div>
        );
    }
}
