const watsonKey = require('../../credentials/watson-nlu');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: watsonKey.apiKey,
    url: watsonKey.url,
    version: '2018-04-05'
  })


  async function fetchWatsonAndReturnKeywords(sentence) {
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


  module.exports = async function fetchKeywordsOfAllSentences(sentences) {
		const listOfKeywordsToFetch = sentences.map( async sentence => await fetchWatsonAndReturnKeywords(sentence))
		return Promise.all(listOfKeywordsToFetch)
	}