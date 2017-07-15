import React, { Component } from 'react';

import SideBarSubtopic from './SideBarSubtopic';


export default class SideBarItem extends Component{

    renderSideBarSubtopic() {
      const subtopics  = this.props.topics;
      console.log(subtopics);
      if (subtopics !== undefined ) {
        return subtopics.map((title) => {
          return <SideBarSubtopic title={title} key={title}/>
        })
      }
    }

    render() {
        return (
            <li>
                <a href="#">{this.props.name}</a>
                {this.renderSideBarSubtopic()}
            </li>
        );
    }
}
