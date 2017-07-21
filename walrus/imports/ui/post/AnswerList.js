import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';

import { Children } from '../../api/children';
import Answer from '../containers/AnswerContainer';

export default class AnswerList extends Component {
    renderAnswers() {
        return this.props.children.map((answer) => {
            return <Answer answer={answer} key={answer._id}/>
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
