import React, { Component } from 'react'

export default class CategoryLabel extends Component {
    render() {
        const categoryName = this.props.category.split('-')[2];
        return (
                <span><button type="button" className="btn btn-info btn-xs">{categoryName}</button></span>
        );
    }
}
