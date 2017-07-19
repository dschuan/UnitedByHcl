import React, { Component } from 'react'

export default class CategoryLabel extends Component {
    render() {
        return (
                <span><button type="button" className="btn btn-info btn-xs">{this.props.Category}</button></span>
        );
    }
}
