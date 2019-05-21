require('dotenv').config();
const {google} = require('googleapis')
const customsearch = google.customsearch('v1')
const config = require('../../credentials/googleApi');

module.exports = async query => new Promise((resolve, _) => {
        customsearch.cse.list({
            auth: config.apiKey,
            cx: config.ggCx,
            num: 3,
            q: query,
            searchType: 'image'
        })
        .then(result => {
            const imagesUrl = result.data.items.map(item => item.link)
            resolve(imagesUrl)
        });
    })