export default function animateCSS(element, animationName, modifier, callback) {
	let el = element
	return new Promise((resolve) => {
		if (Object.prototype.toString.call(el) === '[object String]') {
			el = document.getElementById(el)
			el.classList.add('animated', animationName)
		} else if (el === Object(el)) {
			el.classList.add('animated', animationName)
		}
		if (Object.prototype.toString.call(modifier) === '[object String]') {
			el.classList.add(modifier)
		} else if (
			Object.prototype.toString.call(modifier) === '[object Array]'
		) {
			for (let i = 0; i < modifier.length; i++) {
				el.classList.add(modifier[i])
			}
		}
		const eventHandler = () => {
			el.classList.remove('animated', animationName)
			if (
				Object.prototype.toString.call(modifier) === '[object String]'
			) {
				el.classList.remove(modifier)
			} else if (
				Object.prototype.toString.call(modifier) === '[object Array]'
			) {
				for (let i = 0; i < modifier.length; i++) {
					el.classList.remove(modifier[i])
				}
			}
			el.removeEventListener('animationend', eventHandler)
			resolve()
			if (typeof callback === 'function') {
				callback()
			}
		}
		el.addEventListener('animationend', eventHandler)
	})
}
