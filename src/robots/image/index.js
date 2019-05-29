/* eslint-disable no-plusplus */
const googleImage = require('./GoogleImages')
const state = require('../state/index')

async function robot() {
  const content = state.load()

  //await googleImage(content)
  await downloadAllImages(content)

  //state.save(content)
}

async function downloadAllImages(content){
content.downloadImages = []

  for(let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++){
    const {images} = content.sentences[sentenceIndex]

    for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
      const imageUrl = images[imageIndex]

      try{
        if(content.downloadImages.includes(imageUrl)){
          throw new Error('Imagem já baixada')
        }
        
        // await downloadImage()
        content.downloadImages.push(imageUrl)
        console.log(`> [${sentenceIndex}] [${imageIndex}] Baixou a imagem com sucesso: ${imageUrl}`)
        break
      }catch(error){
        console.log(`> [${sentenceIndex}] [${imageIndex}] Erro ao baixar (${imageUrl}): ${error}`)
      }
    }
  }
}

module.exports = robot