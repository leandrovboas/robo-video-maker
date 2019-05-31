const googleImage = require('./googleImages')
const state = require('../state/index')
const downloadAllImages = require('./downloadImage');

async function robot() {
  const content = state.load()

  await googleImage(content)
  await downloadAllImages(content)

  state.save(content)
}

module.exports = robot