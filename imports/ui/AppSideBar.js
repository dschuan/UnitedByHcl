import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import SideBarItem from './SideBarItem';
import SideBarFooter from './SideBarFooter';
import { Categories } from '../api/categories';

export default class AppSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {

    this.barTracker = Tracker.autorun(() => {
        Meteor.subscribe('categories');
        const cat = Categories.find({}).fetch();
        this.setState({
          categories: cat
        });
      });
  }

  componentWillUnmount() {
    this.barTracker.stop();
  }

  renderSideBarItem() {
    const catList = this.state.categories;
    return catList.map((cat) => {
        return <SideBarItem name={cat.name} topics={cat.topics} key={cat._id} />
    });
  }

    render() {
        return (
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    {this.renderSideBarItem()}
                </ul>
            </div>
        );
    }
}
