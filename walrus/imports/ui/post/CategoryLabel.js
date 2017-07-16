import React, { Component } from 'react'

export default class CategoryLabel extends Component {
    render() {
        return (
            <div>
                <span><button type="button" className="btn btn-info btn-xs">{this.props.category}</button></span>
                <span><button type="button" className="btn btn-info btn-xs">{this.props.category}</button></span>
            </div>
        );
    }
}
