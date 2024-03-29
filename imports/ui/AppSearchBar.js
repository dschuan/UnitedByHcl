import React, { Component } from 'react';

export default class AppSearchBar extends Component {
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form className="navbar-form navbar-left" role="search" onSubmit={() => this.handleSubmit()}>
                <div className="form-group app-search">
                    <span className="space-buffer"></span>
                    <button type="submit" className="btn btn-default app-header-icon">
                        <span className="glyphicon glyphicon-search white"></span>
                    </button>
                    <input type="text" className="form-control app-search-bar" placeholder="Search discussions for any topic..." />
                </div>
            </form>
        );
    }
}
