import React, { Component } from 'react';
import { HTTP } from 'meteor/http';
var FontAwesome = require('react-fontawesome');

import { Button, Col, Image } from 'react-bootstrap';

export default class SuggestionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content : "",
            url: "",
        };
        this.fetchInfo();
    }

    fetchInfo() {
        let url = Meteor.absoluteUrl() + 'api/' + this.props.site
        options = {
            data : {
                title: this.props.title
            }
        }
        HTTP.call("POST", url, options, (error, response) => {
            this.setState({
                content: response.data.info,
                url: response.data.link
            });
        });
    }

    render() {
        const { site } = this.props;
        return (
            <div className="suggestion-item">
                    <div className="suggestion-item-text">
                    {this.state.content}
                    </div>
                    <div>
                        <span>
                            <Image src={"/icons/"+site+".png"} rounded responsive className="api-icon"/>
                        </span>
                        <span>
                            <Button bsStyle="link"  onClick={() => this.state.url === "" ? null : window.open(this.state.url)}>
                                View More
                            </Button>
                        </span>
                    </div>
            </div>
        );
    }
}
