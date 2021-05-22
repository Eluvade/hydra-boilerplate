import animate from './animate'
// import loaderGif from '../assets/loader.gif'
;(async () => {
	await animate('loader', 'fadeOut') // Fades out loader
	const loader = document.getElementById('loader')
	// loader.src = loaderGif
	const root = document.getElementById('root')
	loader.classList.add('hidden')
	root.classList.remove('hidden')
	animate('root', 'fadeInDown')
})()
