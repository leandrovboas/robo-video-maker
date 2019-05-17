const Algorithmia = require("algorithmia");
const algorithmiaApiKey = require('../../credentials/algorithmia.json').apiKey
const sanitizeContent = require('./sanitizeContent')
const breakSentences = require('./breakSentences')
const watsonGetKeywords = require('./watson')

async function robot(content){
	await fetchContentFormWikipedia(content)
	const sourceContentSanitize = sanitizeContent(content.sourceContentOriginal)
	const breackIntosentences = breakSentences(sourceContentSanitize)
	const sentencesWithKeywords = await fetchKeywordsOfAllSentences(limitMaxmumSentences(breackIntosentences))

	async function fetchContentFormWikipedia(content) {

		var input = {
			"articleName": content.searchTerm,
			"lang": "pt"
			};

		const response =await Algorithmia.client(algorithmiaApiKey)
			.algo("web/WikipediaParser/0.1.2?timeout=300")
			.pipe(input);

		content.sourceContentOriginal = response.get().content
	}

	function limitMaxmumSentences (sentences) {
		return sentences.slice(0, content.maximumSentences) 
	}
	
	async function fetchKeywordsOfAllSentences(sentences) {
		const listOfKeywordsToFetch = sentences.map( async sentence => await watsonGetKeywords(sentence))
		return Promise.all(listOfKeywordsToFetch)
	}

	return {
		...content,
		sourceContentSanitize,
		sentences: sentencesWithKeywords
	}
}

module.exports = robot;