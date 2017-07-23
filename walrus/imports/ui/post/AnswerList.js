import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Well } from 'react-bootstrap';
import { Children } from '../../api/children';
import Answer from '../containers/AnswerContainer';

export default class AnswerList extends Component {
    renderAnswers() {
        return this.props.children.map((answer) => {
            return <Well id={answer._id}><Answer answer={answer} key={answer._id} thisUser={this.props.thisUser}/></Well>
        });
    }

    render() {
        console.log('answer list ', this.props);
        return (
            <div>
                {this.renderAnswers()}
            </div>
        );
    }
}
