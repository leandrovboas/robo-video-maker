var Algorithmia = require("algorithmia");
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
async function robot(content){
	await fetchContentFormWikipedia(content)
	sanitizeContent(content)


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

	function sanitizeContent(content){
		const withoutBlankLinesAndMarkdown = removeBlankLines(content.sourceContentOriginal);
		const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
		console.log(withoutDatesInParentheses)

		function removeBlankLines(text) {
			const allLines = text.split('\n')
			const withoutBlankLinesAndMarkdown = allLines.filter( line => {
				if(line.trim().length === 0 || line.trim().startsWith('=')){
					return false
				}
				return true
			})

			return withoutBlankLinesAndMarkdown.join(' ')
		}

		function removeDatesInParentheses(text) {
			return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
		  }
	}
}

module.exports = robot;