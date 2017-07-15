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

    console.log(this.state.categories)

    this.linksTracker = Tracker.autorun(() => {
        Meteor.subscribe('categories');
        const cat = Categories.find({}).fetch();
        console.log(cat);
        this.setState({
          categories: cat
        });
      });
      console.log(this.state.categories);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
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
                <SideBarFooter />
            </div>
        );
    }
}
