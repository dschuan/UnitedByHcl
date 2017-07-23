import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AnswerTextBox from './AnswerTextBox';

export default class AnswerPostArea extends Component {
    constructor(props) {
        super(props);
        this.state = { showTextBox: false };
    }

    handleButtonClick() {
        this.setState({
            showTextBox: !this.state.showTextBox
        });
    }

    render() {
        return (
            <div>
                {this.state.showTextBox ?
                    <AnswerTextBox hideTextArea={this.handleButtonClick.bind(this)} postId={this.props.postId}/>
                    :
                    <Button bsStyle="primary" onClick={this.handleButtonClick.bind(this)}>
                        Answer this question
                    </Button>}
            </div>
        );
    }
}

AnswerPostArea.propTypes = {
    postId : React.PropTypes.string.isRequired
}
