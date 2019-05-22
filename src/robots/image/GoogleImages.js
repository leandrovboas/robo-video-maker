require('dotenv').config();
const {google} = require('googleapis')
const customsearch = google.customsearch('v1')
const googleSearchCredentials = require('../../credentials/googleApi');

async function fetchGoogleAndReturnImagesLinks(query) {
    const response = await customsearch.cse.list({
      auth: googleSearchCredentials.apiKey,
      cx: googleSearchCredentials.ggCx,
      num: 2,
      q: query,
      searchType: 'image'
    })

    const imagesUrl = response.data.items.map(item => item.link)

    return imagesUrl
  }


 module.exports = async function fetchImagesOfAllSentences(content) {
    for (const sentence of content.sentences) {
      const query = `${content.searchTerm} ${sentence.keywords[0]}`
      sentence.images = await fetchGoogleAndReturnImagesLinks(query)

      sentence.googleSearchQuery = query
    }
  }