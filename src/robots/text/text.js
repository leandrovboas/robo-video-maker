const Algorithmia = require("algorithmia");
const algorithmiaApiKey = require('../../credentials/algorithmia.json').apiKey
const sanitizeContent = require('./sanitizeContent')
const breakContentIntoSentences = require('./breakContentIntoSentences')
const watsonGetKeywords = require('./watson')

async function robot(content){
	await fetchContentFormWikipedia(content)
	const sourceContentSanitize = sanitizeContent(content.sourceContentOriginal)
	const sentences = breakContentIntoSentences(sourceContentSanitize)
	const keywords = await watsonGetKeywords(sentences)

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

	return {
		...content,
		keywords,
		sentences,
		sourceContentSanitize
	}
}

module.exports = robot;