import React, { Component } from 'react';

import UrlLink from '../topics/UrlLink';
import CategoryLabel from '../post/CategoryLabel';

export default class TopicListItem extends Component {
    renderCategoryLabel() {
        const category = this.props.post.category;
        return category.map((category) => {
            return <CategoryLabel category={category} key={category} />
        })
    }
    render() {
        return (
            <div className="question-content">
                <UrlLink text={this.props.post.content.title} />
                {this.renderCategoryLabel()}
                <span className="details-small">
                     {this.props.post.length !== 0 ? this.props.post.answer_count : 0} answer(s) . 39 views
                </span>
                <hr />
            </div>
        );
    }
}
