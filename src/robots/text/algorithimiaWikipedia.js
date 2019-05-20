const Algorithmia = require("algorithmia");
const algorithmiaApiKey = require('../../credentials/algorithmia.json').apiKey

module.exports = async function fetchContentFormWikipedia(content) {

    const input = {
        "articleName": content.searchTerm,
        "lang": "pt"
        };

    const response =await Algorithmia.client(algorithmiaApiKey)
        .algo("web/WikipediaParser/0.1.2?timeout=300")
        .pipe(input);

    return response.get().content
}