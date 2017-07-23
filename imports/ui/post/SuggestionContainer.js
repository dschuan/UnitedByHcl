import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import SuggestionItem from './SuggestionItem';

export default class SuggestionContainer extends Component {
    render() {
        return (
            <div className="suggestion-container">
                <Grid >
                  <Row className='show-grid'>
                      <Col sm={6} md={3} mdOffset={1}>
                          <SuggestionItem site="quora" title={this.props.title}/>
                      </Col>
                      <Col sm={6} md={3}>
                          <SuggestionItem site="stackoverflow" title={this.props.title}/>
                      </Col>
                      <Col sm={6} md={3}>
                          <SuggestionItem site="reddit" title={this.props.title}/>
                      </Col>
                  </Row>
                </Grid>
            </div>
        );
    }
}
