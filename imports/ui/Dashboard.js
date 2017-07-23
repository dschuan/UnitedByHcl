import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Signup from './Signup';

const styles = {
  page: {
    display: 'block',
  },

  summary: {
    marginTop: 10,
    display: 'flex'
  },

  summaryDiv: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    width: 400,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 20,
    backgroundColor: '#f7f7f7',
  },

  text: {
    fontSize: 13,
  },

  link: {
    color: '#00BBE8',
    fontSize: 13,

  }
}


export default class Dashboard extends Component {
  render() {
    return (
      <div style={styles.page}>
        <div className = "dashboard-summary" style={styles.summary}>
          <div style={styles.summaryDiv}>
            <h5>Trending Status</h5>
            <p style={styles.text}>Popularity: Rapidly Increasing</p>
            <p style={styles.text}>Momentum: Very Strong</p>
          </div>
          <div style={styles.summaryDiv}>
            <h5>Enable Precision Metrics</h5>
            <p style={styles.text}>Precision Metrics provides detailed hourly topic analysis</p>
            <a href='#' style={styles.link}><p>ENABLE PRECISION METRICS</p></a>
          </div>
          <div style={styles.summaryDiv}>
            <h5>Privacy Controls</h5>
            <p style={styles.text}>Popularity: Rapidly Increasing</p>
            <a href='#' style={styles.link}><p>ENABLE PRIVACY CONTROLS</p></a>
          </div>
          <div style={styles.summaryDiv}>
            <h5>Service Loadtest</h5>
            <p style={styles.text}>Test service's down link and up link speed to handle large user load.</p>
            <a href='#' style={styles.link}><p>TEST SERVICE</p></a>
          </div>
        </div>
      </div>

    )
  }
}
