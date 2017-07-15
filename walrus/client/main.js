import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

//import { routes, onAuthChange } from '../imports/routes/routes';
import App from '../imports/ui/App';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  //onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  fetchStackOverflow();
  Session.set('showVisible', true);
  //ReactDOM.render(routes, document.getElementById('app'));
  ReactDOM.render(<App />, document.getElementById('app'));
});

const fetchStackOverflow = () => {
    console.log('fetch stack overflow');
    let question = 'extract html';
    let formattedQuestion = question.replace(" ", "%20");
    let link = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${formattedQuestion}&site=stackoverflow`;
    let questionLink = '';
    let answerId = '';
    fetch(link)
    .then((res) => {
        return res.json();
    })
    .then((json) => {
            for (let i = 0; i < json.items.length; i++) {
                if (json.items[i].is_answered && json.items[i].score >= 0) {
                    console.log(json.items[i].accepted_answer_id);
                    answerId = json.items[i].accepted_answer_id;
                    questionLink = json.items[i].link;
                    break;
                }
            }
            console.log(questionLink);
            console.log(answerId);
            fetch(questionLink, {
              credentials: 'include'
            })
              .then((res) => {
                return res.text();
            }).then((body) => {
                console.log(body);
              })
        });
    }
