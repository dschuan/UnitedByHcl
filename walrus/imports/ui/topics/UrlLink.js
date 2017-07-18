import React, { Component } from 'react';

export default class UrlLink extends Component {
    render() {
            return (
                <div className="post-content">
                    <button className="btn btn-link topic-link">
                        {this.props.text}
                    </button>
                </div>
            );
    }
}
