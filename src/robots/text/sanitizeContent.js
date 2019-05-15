module.exports = function withoutBlankLinesAndMarkdown(text) {
    const allLines = text.split('\n')
    const withoutBlankLinesAndMarkdown = allLines.filter( line => {
        const linhaSemEspacos = line.trim()
        return linhaSemEspacos.length > 0 && !linhaSemEspacos.startsWith('=')
    })
    
    return withoutBlankLinesAndMarkdown
        .join(' ')
        .replace(/\((?:\([^()]*\)|[^()])*\)/gm, '')
        .replace(/ {2}/g,' ')
}