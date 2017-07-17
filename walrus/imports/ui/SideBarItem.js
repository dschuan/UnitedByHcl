import React, { Component } from 'react';

import SideBarSubtopic from './SideBarSubtopic';


export default class SideBarItem extends Component{

    renderSideBarSubtopic() {
      const subtopics  = this.props.topics;
      const _id = this.props.id;
      if (subtopics !== undefined ) {
        return subtopics.map((title) => {
          return <SideBarSubtopic title={title.name} id={title._id} key={title._id}/>
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
