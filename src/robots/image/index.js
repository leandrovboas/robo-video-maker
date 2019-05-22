const googleImage = require('./GoogleImages')
const state = require('../state/index')

async function robot() {
  const content = state.load()

  await googleImage(content)

  state.save(content)
}

module.exports = robot