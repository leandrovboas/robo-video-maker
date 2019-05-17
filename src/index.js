const readline = require('readline-sync')

const robots = {
	text: require('./robots/text/text')
}

async function start(){
	const content = {
		maximumSentences: 7
	}

	content.searchTerm = askAndReturnSearchTerm();
	content.prefix = askAndReturnPrefix()


	const contentText = await robots.text(content)

	function askAndReturnSearchTerm() {
		return readline.question('Type a wikipedia search term: ');
	}

	function askAndReturnPrefix() {
		const prefixes = ['Who is', 'What is', 'The history of']
		const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
		const selectedPrefixText = prefixes[selectedPrefixIndex]
		
		return selectedPrefixText
	}

	console.log(contentText)
}

start()
