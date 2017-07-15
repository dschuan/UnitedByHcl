import React, { Component } from 'react';

export default class SideBarSubtopic extends Component {
    render() {
        return (
            <blockquote className="blockquote subtopic">
                <a href="#" className="subtopic-link">{this.props.title}</a>
            </blockquote>
        )
    }
}
