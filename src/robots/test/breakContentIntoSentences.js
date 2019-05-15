const sentenceBoundaryDetection = require('sbd')

module.exports = 
    function breakContentIntoSentences(sourceContentSanitize){
		return sentenceBoundaryDetection
			.sentences(sourceContentSanitize)
			.map(sentence => ({
				images: [],
				keywords: [],
				text: sentence
			}))
	}
