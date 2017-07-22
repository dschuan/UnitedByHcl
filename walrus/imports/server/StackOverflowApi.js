import { Meteor } from 'meteor/meteor';
import request from 'request';
import { key } from './googleApi';

export function setupStackOverflowApi(app) {
    let cx = '016093447816794459056:pu5mhu5sozs'

    app.post('/api/stackoverflow', (req, res, next) => {
        console.log(req.body.title);
        let title = req.body.title;
        let formatTitle = title.replace(" ", "%20");
        url = 'https://www.googleapis.com/customsearch/v1?key=' + key+ '&cx=' + cx +'&q=' + formatTitle;
        options = {
            url: url,
            json : true
        }

        console.log(url);
        request(options, function(error, body, response) {
            if (error) return error;
            items = body.body.items;
            let allAnswers = [];
            let answers= items.map((item) => {
                if(item.pagemap.answer !== undefined) {
                    item.pagemap.answer.map((ans) => {
                        json = {};
                        json["answer"] = ans;
                        json["link"] = item.link;
                        allAnswers.push(json);
                    });
                }
            });
            allAnswers.sort(function(a, b) {
                return parseFloat(b.answer.upvotecount) - parseFloat(a.answer.upvotecount);
            });
            finalAnswer = {};
            finalAnswer["info"] = allAnswers[0].answer.text;
            finalAnswer["link"] = allAnswers[0].link;
            res.status(200).json(finalAnswer);
        });
    });

    WebApp.connectHandlers.use(app);
}
