import React, { Component } from 'react';

export default class AppNotification extends Component {
    render() {
        return (
            <button className="btn btn-default app-header-icon">
                <span className="glyphicon glyphicon-bell white"></span>
            </button>
        );
    }
}
