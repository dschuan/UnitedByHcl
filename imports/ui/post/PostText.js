import React, { Component } from 'react';

export default class PostText extends Component {
    render() {
            return (
                <div className="post-content">
                    {this.props.text}
                </div>
            );
    }
}
