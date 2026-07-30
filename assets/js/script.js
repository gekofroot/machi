
// variables
let playSpaceLink = document.getElementById('playspace-link')
let logoText = document.getElementById('logo-text')
let logoLetters = document.querySelectorAll('.logo-letter')
let primerOuter = document.getElementById('primer-outer')
let quadGrid = document.getElementById('quad-grid')
let quad1 = document.getElementById('quad-1')
let quad2 = document.getElementById('quad-2')
let quad3 = document.getElementById('quad-3')
let quad4 = document.getElementById('quad-4')
let quads = [
  quad1, quad2, 
  quad3, quad4
]
let primer = document.getElementById('primer')
let primerActive = 0
let clusterField = document.getElementById('cluster-field')
let clusterObjects = document.querySelectorAll('.cluster-object')

// element load in
setTimeout(()=> {
  clusterField.style.opacity = '100'
}, 100)

setTimeout(()=> {
  primerOuter.style.opacity = '100'
}, 300)

setTimeout(()=> {
  primerActive = 1
}, 700)

function quadSlide() {

  let countQuad1 = 0
  let countQuad2 = 0
  let countQuad3 = 0
  let countQuad4 = 0

  let quadSlideInterval = setInterval(()=> {

    if (countQuad1 < -55) {
      clearInterval(quadSlideInterval)
    } else {
      quad1.style.left = `${countQuad1}%`
      quad1.style.top = `${countQuad1}%`
      countQuad1 -= 1
    }
    if (countQuad2 > 55) {
      clearInterval(quadSlideInterval)
    } else {
      quad2.style.left = `${countQuad2}%`
      quad2.style.bottom = `${countQuad2}%`
      countQuad2 += 1
    }
    if (countQuad3 < -55) {
      clearInterval(quadSlideInterval)
    } else {
      quad3.style.left = `${countQuad3}%`
      quad3.style.bottom = `${countQuad3}%`
      countQuad3 -= 1
    }
    if (countQuad4 > 55) {
      clearInterval(quadSlideInterval)
    } else {
      quad4.style.left = `${countQuad4}%`
      quad4.style.top = `${countQuad4}%`
      countQuad4 += 1
    }
  }, 5)
}

let primerCount = 0
let primerTimeout = ''
let clusterItem = 0
primer.addEventListener('click', () => {

  if (primerActive === 1) {

    primer.style.transform = 'translateY(.6em)'
    primerInterval = setInterval(()=> {
      if (primerCount === 80) {
	for (let x = 0; x < quads.length; x++) {
	  quads[x].style.transition = '.2s'
	  quads[x].style.border = '1px solid var(--pad-active)'
	}
	for (let x = 0; x < quads.length; x++) {
	  setTimeout(()=> {
	    quads[x].style.transition = '1s'
	  }, 100)
	}
	primerCount += 1
      } else if (primerCount === 100) {
	primer.style.background = 'var(--pad-active)'
	primerOuter.style.background = 'var(--pad-active)'
	primerOuter.style.boxShadow = 'var(--acnt-f) 0 0 .7em .2em'
	primerCount += 1
      } else if (primerCount > 100) {
	setTimeout(() => {
	  clusterField.style.opacity = '0'
	}, 900)
	quadSlide()
	clusterField.style.rotate = '360deg'
	clearInterval(primerInterval)
	setTimeout(()=> {
	  playSpaceLink.click()
	}, 1500)
      } else {
	primerCount += 1
      }

      if (primerCount % 20 === 5) {
	clusterObjects[clusterItem].style.background = 'var(--pad-active)'
	logoLetters[clusterItem].style.opacity = '100'
	clusterItem += 1
      }
    }, 10)
  }
  primerActive = 0
})

primer.addEventListener('mouseup', ()=> {
  clearTimeout(primerTimeout)
})

