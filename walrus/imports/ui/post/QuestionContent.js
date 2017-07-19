import React, { Component } from 'react';

import PostText from './PostText';
import AnswerPostArea from './AnswerPostArea';

export default class QuestionContent extends Component {
    render() {
        return (
            <div>
                <PostText text={this.props.content} />
                <AnswerPostArea postId={this.props.postId}/>
                <hr />
            </div>
        );
    }
}

QuestionContent.propTypes = {
    post : React.PropTypes.object.isRequired
}
