import { Meteor } from 'meteor/meteor';
import request from 'request';
import { key } from './googleApi';

export function setupQuoraApi(app) {
    let cx = '016093447816794459056:tvooxk5azmu'

    app.post('/api/quora', (req, res, next) => {
        console.log(req.body.title);
        let title = req.body.title;
        let formatTitle = title.replace(" ", "%20");
        url = 'https://www.googleapis.com/customsearch/v1?key=' + key+ '&cx=' + cx +'&q=' + formatTitle;
        console.log(url);
        options = {
            url: url,
            json : true
        };
        console.log(url);
        request(options, function(error, body, response) {
            if (error) return error;
            items = body.body.items;
            let metatag = items.map((item) => {
                json = {};
                json['metatag'] = item.pagemap.metatags;
                json['link'] = item.link;
                return json;
            });
            let description = metatag.map((tag) => {
                json = {};
                json['info'] = tag.metatag[0]['og:description'];
                json['link'] = tag.link;
                return json;
            });
            let descriptionFiltered = description.filter((description) => description.info != null);
            res.status(200).json(descriptionFiltered[0]);
        });
    });

    WebApp.connectHandlers.use(app);
}
