import { Meteor } from 'meteor/meteor';
import request from 'request';

export function setupQuoraApi(app) {
    let apiKey = 'AIzaSyAAEB-SDKMU8ou5_-cZBxtytgL6gSbB2P4'
    let cx = '016093447816794459056:tvooxk5azmu'

    app.post('/api/quora', (req, res, next) => {
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
            let metatag = items.map((item) => item.pagemap.metatags);
            let description = metatag.map((tag) => tag[0]['og:description']);
            let descriptionFiltered = description.filter((description) => description != null);
            res.status(200).json(descriptionFiltered[0]);
        });
    });

    WebApp.connectHandlers.use(app);
}
