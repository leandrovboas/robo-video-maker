
const algorithimiaWikipedia = require('./algorithimiaWikipedia')
const sanitizeContent = require('./sanitizeContent')
const breakSentences = require('./breakSentences')
const watsonGetKeywords = require('./watson')
const state = require('../state/index')

async function robot(){
	const content = state.load()
	content.sourceContentOriginal = await algorithimiaWikipedia(content)
	content.sourceContentSanitize = sanitizeContent(content.sourceContentOriginal)
	const breackIntosentences = breakSentences(content.sourceContentSanitize)
	content.sentences = await watsonGetKeywords(limitMaxmumSentences(breackIntosentences))

	state.save(content)

	function limitMaxmumSentences (sentences) {
		return sentences.slice(0, content.maximumSentences) 
	}
}




module.exports = robot;