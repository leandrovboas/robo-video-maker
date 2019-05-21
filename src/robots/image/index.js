const state = require('../state/index')
const google = require('./GoogleReturnImages')

function robot (){
    const content = state.load()

    fetchImagesOfAllSentences(content)

    
    console.dir(content.sentences, {depth: null})
    state.save(content)

    function fetchImagesOfAllSentences(content) {
        for (const sentence of content.sentences) {
            const query = `${content.searchTerm} ${sentence.keywords[0]}`
          google(query).then(result => {
              console.log(result)
            sentence.images = result
        })
        //sentence.images = google(query)
        sentence.googleSearchQuery = query
          console.dir(sentence, {depth: null})
        }
      }

}

module.exports = robot