import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';

import { Children } from '../../api/children';
import Answer from './Answer';

export default class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerList: []
        }
    }

    componentDidMount() {
        const postId = this.props.postId;
        this.answerTracker = Tracker.autorun(() => {
            Meteor.subscribe('children');
            const answerList = Children.find({ postId }).fetch();
            this.setState({
                answerList
            });
        });
    }

    componentWillUnmount() {
        console.log('component will unmount, AnswerPost');
        this.answerTracker.stop();
    }

    renderAnswers() {
        return this.state.answerList.map((answer) => {
            return <Answer answer={answer} key={answer._id}/>
        });
    }

    render() {
        console.log('answer list ', this.state.answerList);
        return (
            <div>
                {this.renderAnswers()}
            </div>
        );
    }
}
