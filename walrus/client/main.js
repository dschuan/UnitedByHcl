import '../imports/startup';


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
