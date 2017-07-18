import React, { Component } from 'react';

import PostText from './PostText';

export default class Answer extends Component {
    render() {
        const { answer } = this.props;
        return (
            <div>
                <span>
                        Answered by: <button className="btn btn-link">{answer.username} (4.9/5)</button>
                </span>
                <span className="details-small">
                    Updated on date . Post rated 4.9/5.0 .
                </span>
                <span className="details-small">
                    User flair
                </span>
                <PostText text={answer.content} />
                <hr />
            </div>
        );
    }
}

Answer.propTypes = {
    answer : React.PropTypes.object.isRequired
}
