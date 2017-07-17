import React, { Component } from 'react';

import SideBarSubtopic from './SideBarSubtopic';


export default class SideBarItem extends Component{

    renderTopicName(name) {
      let temp = name.split('_');
      return temp2 = name.replace((temp[0] + "_"), '').replace(/-/g, ' ');
    }

    renderSideBarSubtopic() {
      const subtopics  = this.props.topics;
      const _id = this.props.id;
      if (subtopics !== undefined ) {
        return subtopics.map((title) => {
          return <SideBarSubtopic title={this.renderTopicName(title.name)} id={title.name} key={title._id}/>
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
