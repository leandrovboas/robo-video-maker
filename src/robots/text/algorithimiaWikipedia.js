const Algorithmia = require("algorithmia");
const algorithmiaApiKey = require('../../credentials/algorithmia')

module.exports = async function fetchContentFormWikipedia(content) {

    const input = {
        "articleName": content.searchTerm,
        "lang": "pt"
        };

    const response =await Algorithmia.client(algorithmiaApiKey.apiKey)
        .algo("web/WikipediaParser/0.1.2?timeout=300")
        .pipe(input);

    return response.get().content
}