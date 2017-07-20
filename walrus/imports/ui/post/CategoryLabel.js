import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

export default class CategoryLabel extends Component {
    render() {
        const label = this.props.category.split("-")[2];
        return (
                <span><Button bsStyle="info" bsSize="xsmall">{label}</Button></span>
        );
    }
}
