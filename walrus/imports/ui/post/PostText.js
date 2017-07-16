import React, { Component } from 'react';

export default class PostText extends Component {
    render() {
            return (
                <div>
                    {this.props.text}
                </div>
            );
    }
}
