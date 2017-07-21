import { Meteor } from 'meteor/meteor';
import request from 'request';

export function setupRedditApi(app) {
    let apiKey = 'AIzaSyAAEB-SDKMU8ou5_-cZBxtytgL6gSbB2P4'
    let cx = '016093447816794459056:wcjoxd2my44'

    app.post('/api/reddit', (req, res, next) => {
        console.log(req.body.title);
        let title = req.body.title;
        let formatTitle = title.replace(" ", "%20");
        url = 'https://www.googleapis.com/customsearch/v1?key=' + apiKey+ '&cx=' + cx +'&q=' + formatTitle;
        options = {
            url: url,
            json : true
        }
        console.log(url);
        request(options, function(error, body, response) {
            if (error) return error;
            items = body.body.items;
            let snippet = items.map((item) => item.snippet);
            let snippetFiltered = snipper.filter((snippet) => snipper != null);
            res.status(200).json(snippetFiltered[0]);
        });
    });

    WebApp.connectHandlers.use(app);
}
