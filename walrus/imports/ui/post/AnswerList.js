import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';

import { Children } from '../../api/children';
import Answer from './Answer';

export default class AnswerList extends Component {
    renderAnswers() {
        /*return this.props.children.map((answer) => {
            return <Answer answer={answer} key={answer._id}/>
        }); */
        return <Answer answer = {this.props.children} />
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
