import React, { Component } from 'react';

import AppSideBar from './AppSideBar';

export default class AppBody extends Component {
    render() {
        return (
            <div>
                <div id="wrapper" className="col-sm-2">
                        <AppSideBar />
                </div>
                <div className="col-sm-offset-2 col-sm-10">
                    <p>Your content here</p>
                </div>
            </div>
        );
    }
}
