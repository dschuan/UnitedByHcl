import React, { Component } from 'react';

import AppHeaderBar from './AppHeaderBar';
import AppBody from './AppBody';

export default class App extends Component {
    render() {
        return (
            <div>
                <AppHeaderBar />
                <AppBody />
            </div>
        );
    }
}
