'use strict';

(async _ => {
  await animate('loader', 'fadeOut') // Fades out loader
  const loader = document.getElementById('loader') // Potentially remove this line to increase performance(2x)
  const root = document.getElementById('root')
  loader.classList.add('hidden')
  root.classList.remove('hidden')
  animate('root', 'fadeInDown')
})()

function animate(element, animationName, modifier, callback) {
  return new Promise((resolve) => {
    const node = document.getElementById(element)
    node.classList.add('animated', animationName)
    if (typeof modifier === 'string') {
      node.classList.add(modifier)
    }
    node.addEventListener('animationend', _ => {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', this)
      resolve()
      if (typeof callback === 'function') {
        callback(node)
      }
    })
  })
}
