import React, { Component } from 'react';

export default class TopicHeader extends Component{
    render() {
        return(
            <div className="topic-header">
                <div className="col-sm-11 topic-header-title">
                    Recent Posts
                </div>
                <div className="col-sm-1">
                    <button className="btn btn-primary new-post-btn">
                        New Post
                    </button>
                </div>
            </div>
        );
    }
}
