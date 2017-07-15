import React, { Component } from 'react';

import SideBarItem from './SideBarItem';
import SideBarFooter from './SideBarFooter';

export default class AppSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = { topics : [
                                    { title: 'Aerospace Engineering' },
                                    { title: 'Sketching'},
                                    { title: 'Coding',
                                       subtopics : ['C++', 'Cloud Computing', 'Java', 'Javascript', 'Python'] },
                                    { title: 'Robotics' },
                                    { title: 'Materials Engineering' }]};
    }

    renderSideBarItem() {
        return this.state.topics.map((topic) => {
            return <SideBarItem topic={topic} key={topic.title} />
        });
    }

    render() {
        return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    {this.renderSideBarItem()}
                </ul>
                <SideBarFooter />
            </div>
        );
    }
}
