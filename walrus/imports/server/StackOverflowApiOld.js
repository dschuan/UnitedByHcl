import { Meteor } from 'meteor/meteor';
import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

export function setupStackOverflowApi(app) {

    app.post('/api/stackoverflow', (req, res, next) => {
        // get params from req.body
        console.log(req.body.title);
        let title = req.body.title
        let formatTitle = title.replace(" ", "%20");
        let url = "http://api.stackexchange.com/2.2/search?order=desc&sort=relevance&intitle="+formatTitle+"&site=stackoverflow";
        let options = {
            url: url,
            json: true,
            gzip: true
        };
        request(options, function(error, response, body){
            if (error) return error;
            let items = body.items;
            let filteredItems = items.filter((item) => item.is_answered === true && item.score > 0 && item.accepted_answer_id !== null);
            //console.log(filteredItems);
            let answer_id = filteredItems.map((item) => item.accepted_answer_id);
            let url2 = "https://stackoverflow.com/a/" + answer_id[0];
            let id = "#answer-" + answer_id[0];

            request(url2, function(error, response, html) {
                if(error) return error;

                    let $ = cheerio.load(html);
                    let json = { content: ""};
                    $(id).filter(function() {
                        var data = $(this);
                        //console.log(data.children().children().children().first().children().first().next().children().children().text());
                        content = data.children().children().children().first().children().first().next().children().children().text();
                        json.content = content;
                    });
                    res.status(200).json(json);
            });
        });
    });

    WebApp.connectHandlers.use(app);
}
