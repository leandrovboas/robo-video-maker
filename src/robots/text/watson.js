const watsonApiKey = require('../../credentials/watson-nlu.json').apikey
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/',
    version: '2018-04-05'
  })


  module.exports = async function fetchWatsonAndReturnKeywords(sentence) {
    return new Promise((resolve, reject) => {
      nlu.analyze({
        features: {
          keywords: {}
        },
        text: sentence.text
      }, (error, response) => {
        if (error) {
          reject(error)
          return
        }

        sentence.keywords = response.keywords.map(keyword => keyword.text)

        resolve(sentence)
      })
    })
  }