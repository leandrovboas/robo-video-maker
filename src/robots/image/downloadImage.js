/* eslint-disable no-plusplus */
const imageDownloader = require('image-downloader')

async function downloadAndSave(url, fileName){
    return imageDownloader.image({
      url: url,
      dest: `./src/content/${fileName}`
    })
  }

module.exports = async function downloadAllImages(content){
    content.downloadImages = []
    
      for(let sentenceIndex = 0; sentenceIndex < content.sentences.length; sentenceIndex++){
        const {images} = content.sentences[sentenceIndex]
    
        for(let imageIndex = 0; imageIndex < images.length; imageIndex++){
          const imageUrl = images[imageIndex]
    
          try{
            if(content.downloadImages.includes(imageUrl)){
              throw new Error('Imagem já baixada')
            }
            
            await downloadAndSave(imageUrl, `${sentenceIndex}-original.png`);
            content.downloadImages.push(imageUrl)
            console.log(`> [${sentenceIndex}] [${imageIndex}] Baixou a imagem com sucesso: ${imageUrl}`)
            break
          }catch(error){
            console.log(`> [${sentenceIndex}] [${imageIndex}] Erro ao baixar (${imageUrl}): ${error}`)
          }
        }
      }
    }