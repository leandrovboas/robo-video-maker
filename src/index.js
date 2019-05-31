const robots = {
	image: require('./robots/image/index'),
	input: require('./robots/text/input'),
	state: require('./robots/state/index'),
	text: require('./robots/text/index')
  }

async function start(){

	await robots.input()
	await robots.text()
	await robots.image()
	
	const content = robots.state.load()
	console.dir(content.sentences, {depth: null})
}

start()