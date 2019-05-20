
const robots = {
	input: require('./robots/text/input'),
	state: require('./robots/state/index'),
	text: require('./robots/text/index')
  }

async function start(){

	robots.input()
	await robots.text()

	const content = robots.state.load()
	console.dir(content, { depth: null })
}

start()