import React, { Component } from 'react';
import { Link } from 'react-router';

import SideBarSubtopic from './SideBarSubtopic';

export default class SideBarItem extends Component{
    renderSideBarSubtopic() {
        const { subtopics } = this.props.topic;
        if (subtopics !== undefined) {
            return subtopics.map((title) => {
                return <SideBarSubtopic title={title} key={title}/>
            });
        }
    }
    render() {
        return (
            <li>
                <a href="#">{this.props.topic.title}</a>
                {this.renderSideBarSubtopic()}
            </li>
        );
    }
}
