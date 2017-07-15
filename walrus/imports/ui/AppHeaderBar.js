import React, { Component } from 'react';

import AppSearchBar from './AppSearchBar';
import AppNotification from './AppNotification';
import AppSettings from './AppSettings';
import UserProfileIcon from './UserProfileIcon';

export default class AppHeaderBar extends Component {
    render() {
        return (
            <nav className = "navbar navbar-default app-header" role = "navigation">

               <div className  = "navbar-header col-sm-2">
                  <a className  = "navbar-brand" href = "#">REPPO</a>
               </div>
               <div className = "navbar-header col-sm-8 col-xs-12">
                   <AppSearchBar />
               </div>
               <div className = "navbar-header col-sm-2 col-xs-0">
                   <div className="col-sm-4" >
                       <AppNotification />
                   </div>
                    <div className="col-sm-4">
                        <AppSettings />
                    </div>
                     <div className="col-sm-4">
                         <UserProfileIcon />
                     </div>
               </div>
            </nav>
        )
    }
}
