import animate from './animate'
;(async () => {
  await animate('loader', 'fadeOut') // Fades out loader
  const loader = document.getElementById('loader')
  const root = document.getElementById('root')
  loader.classList.add('hidden')
  root.classList.remove('hidden')
  animate('root', 'fadeInDown')
})()
