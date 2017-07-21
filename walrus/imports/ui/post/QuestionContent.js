import React, { Component } from 'react';

import PostText from './PostText';
import AnswerPostArea from './AnswerPostArea';

export default class QuestionContent extends Component {

    render() {
      console.log('QuestionContent ' + this.props);
        return (
            <div>
                <AnswerPostArea postId={this.props.postId}/>
            </div>
        );
    }
}

QuestionContent.propTypes = {
    post : React.PropTypes.object.isRequired
}
