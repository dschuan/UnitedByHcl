import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import QuestionPost from './QuestionPost';

export default class PostDetails extends Component {
    render() {
        console.log('PostDetails', this.props);
        return (
            <div className="col-sm-12 col-sm-offset-1">
                <div> Newly Posted / Established Post </div>
                <QuestionPost />
                <div> Answer Area </div>
                <div> Suggestion Area </div>
                <div className="col-sm-4">
                        Quora
                </div>
                <div className="col-sm-4">
                        Stackoverflow
                </div>
                <div className="col-sm-4">
                        Reddit
                </div>
            </div>
        );
    }
}
