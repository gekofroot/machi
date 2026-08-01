
// variables
let outerField = document.getElementById('outer-field')
let sectionUpper = document.getElementById('section-upper')
let sectionMain = document.getElementById('section-main')
let sectionLower = document.getElementById('section-lower')
let seqPrime = document.getElementById('seq-prime')
let roundDisplay = document.getElementById('round-display')
let pointsDisplay = document.getElementById('points-display')
let multiDisplay = document.getElementById('multi-display')
let fruitDisplay = document.getElementById('fruit-display')
let topRoundDisplay = document.getElementById('top-round-display')
let highscoreDisplay = document.getElementById('highscore-display')
displayItems = document.querySelectorAll('.display-item')
let menuField = document.getElementById('menu-field')
let menuToggle = document.getElementById('menu-toggle')
let gridSelection = document.getElementById('grid-selection')
let themeSelection = document.getElementById('theme-selection')

let currentRound2 = 1
let currentRound3 = 1
let currentRound4 = 1
let currentRound5 = 1
let currentRound6 = 1
let currentRound7 = 1
let currentRounds = [
  currentRound2, currentRound3,
  currentRound4, currentRound5,
  currentRound6, currentRound7
]

let topRound2 = 0
let topRound3 = 0
let topRound4 = 0
let topRound5 = 0
let topRound6 = 0
let topRound7 = 0
let topRounds = [
  topRound2, topRound3,
  topRound4, topRound5,
  topRound6, topRound7
]

let highScore2 = 0
let highScore3 = 0
let highScore4 = 0
let highScore5 = 0
let highScore6 = 0
let highScore7 = 0
let highScores = [
  highScore2, highScore3,
  highScore4, highScore5,
  highScore6, highScore7
]

let pointSum2 = 0
let pointSum3 = 0
let pointSum4 = 0
let pointSum5 = 0
let pointSum6 = 0
let pointSum7 = 0
let pointSums = [
  pointSum2, pointSum3,
  pointSum4, pointSum5,
  pointSum6, pointSum7
]

let multiSum2 = 0
let multiSum3 = 0
let multiSum4 = 0
let multiSum5 = 0
let multiSum6 = 0
let multiSum7 = 0
let multiSums = [
  multiSum2, multiSum3,
  multiSum4, multiSum5, 
  multiSum6, multiSum7
]

let fruitSum2 = 3
let fruitSum3 = 3
let fruitSum4 = 3
let fruitSum5 = 3
let fruitSum6 = 3
let fruitSum7 = 3
let fruitSums = [
  fruitSum2, fruitSum3,
  fruitSum4, fruitSum5,
  fruitSum6, fruitSum7
]

let gridSize = 2
let indexValue = 0
let inputSynchro = 0
let activeSequence = 0
let cumuloBar = 0
let countInit = 0
let countStored = 0
let valueCount = 1
let sequenceArray = []
let storedSequenceArray = []
let inputSequenceArray = []

// retrieve store
let storedDataTheme = localStorage.getItem('data-theme')
if (storedDataTheme) {
  document.documentElement.setAttribute('data-theme', storedDataTheme)
  themeSelection.value = storedDataTheme
} else {
  document.documentElement.setAttribute('data-theme', 'Sheab')
  localStorage.setItem('theme', 'Sheab')
  themeSelection.value = 'Sheab'
}


let storedTopRound2 = localStorage.getItem('stored-top-round-2')
let storedTopRound3 = localStorage.getItem('stored-top-round-3')
let storedTopRound4 = localStorage.getItem('stored-top-round-4')
let storedTopRound5 = localStorage.getItem('stored-top-round-5')
let storedTopRound6 = localStorage.getItem('stored-top-round-6')
let storedTopRound7 = localStorage.getItem('stored-top-round-7')

let storedTopRounds = [
  storedTopRound2, storedTopRound3, 
  storedTopRound4, storedTopRound5, 
  storedTopRound6, storedTopRound7
]

let storedHighScore2 = localStorage.getItem('stored-high-score-2')
let storedHighScore3 = localStorage.getItem('stored-high-score-3')
let storedHighScore4 = localStorage.getItem('stored-high-score-4')
let storedHighScore5 = localStorage.getItem('stored-high-score-5')
let storedHighScore6 = localStorage.getItem('stored-high-score-6')
let storedHighScore7 = localStorage.getItem('stored-high-score-7')

let storedHighScores = [
  storedHighScore2, storedHighScore3, 
  storedHighScore4, storedHighScore5, 
  storedHighScore6, storedHighScore7
]

for (let x = 0; x < storedHighScores.length; x++) {
  if (storedHighScores[x]) {
  } else {
      storedHighScores[x] = 0
  }
}

let storedGridSize = localStorage.getItem('stored-grid-size')

if (storedGridSize) {
  updateDisplayValue(highscoreDisplay, storedHighScores)
  updateDisplayValue(topRoundDisplay, storedTopRounds)
} else {
  updateDisplayValue(highscoreDisplay, 0)
  updateDisplayValue(topRoundDisplay, 0)
}

// element load in
function elementLoadIn() {
  setTimeout(()=> {
    sectionUpper.style.opacity = '100'
    sectionLower.style.opacity = '100'
  }, 100)

  setTimeout(()=> {
    sectionUpper.style.width = '100%'
    sectionUpper.style.height = '15%'
    sectionLower.style.width = '100%'
    sectionLower.style.height = '15%'
  }, 300)

  setTimeout(()=> {
    sectionMain.style.height = '60%'
  }, 400)

  setTimeout(()=> {
    sectionMain.style.opacity = '100'
  }, 500)

  setTimeout(()=> {
    sectionMain.style.width = '100%'
  }, 700)
  setTimeout(()=> {
    menuToggle.style.opacity = '100'
  }, 1100)

  setTimeout(()=> {
    seqPrime.style.opacity = '100'
  }, 1200)

  let displayItemCount = 0
  setTimeout(()=> {
    let displayItemInterval = setInterval(()=> {
      if (displayItemCount > displayItems.length - 1) {
	let displayUpdateInterval = setInterval(()=> {
	  if (updateCount < updateValueX.length) {
	    updateDisplayValue(updateValueX[updateCount], updateValueY[updateCount])
	    updateCount += 1
	  } else {
	    clearInterval(displayUpdateInterval)
	  }
	}, 100)
	clearInterval(displayItemInterval)
      } else {
	displayItems[displayItemCount].style.opacity = '100'
	displayItemCount += 1
      }
    }, 100)
  }, 1300)
}
elementLoadIn()

let flow = 0
let digiFlow = 5
let fruitFlow = 1

let updateCount = 0
let updateValueX = [
  roundDisplay, pointsDisplay,
  multiDisplay, fruitDisplay
]
let updateValueY = [
  currentRounds, pointSums,
  multiSums, fruitSums
]

if (storedHighScores[gridSize - 2]) {
  updateDisplayValue(highscoreDisplay, storedHighScores)
  updateDisplayValue(topRoundDisplay, storedTopRounds)
} else {
  updateDisplayValue(highscoreDisplay, highScores)
  updateDisplayValue(topRoundDisplay, topRounds)
}

for (let x = 0; x < gridSize * gridSize; x++) {
  let newNode = document.createElement('input')
  newNode.setAttribute('type', 'button')
  newNode.setAttribute('class', 'grid-pad')
  newNode.setAttribute('id', `grid-pad-${x}`)
  sectionMain.appendChild(newNode)
}
let gridPads = document.querySelectorAll('.grid-pad')

function generateSequence(inputRound) {

  if (storedSequenceArray.length > 0) {
    let sequenceIntervalStored = setInterval(() => {
      sequenceArray = storedSequenceArray
      let selectIndex = storedSequenceArray[countStored]
      //sequenceArray.push(selectIndex)
      gridPads[selectIndex].style.background = 'var(--pad-active'
      gridPads[selectIndex].style.borderBottom = '2px outset var(--acnt-a)'
      setTimeout(() => {
	gridPads[selectIndex].style.background = 'var(--pad-base)'
	gridPads[selectIndex].style.borderBottom = '4px outset var(--acnt-a)'
      }, 500)
      if (countStored === inputRound - 1) {
	setTimeout(() => {
	  inputSynchro = 1
	  clearInterval(sequenceIntervalStored)
	}, 500)
      }
      countStored += 1
    }, 700)
  } else {
    let sequenceIntervalInit = setInterval(() => {
      let selectIndex = Math.floor(Math.random(1) * (gridPads.length))
      sequenceArray.push(selectIndex)
      gridPads[selectIndex].style.background = 'var(--pad-active'
      gridPads[selectIndex].style.borderBottom = '2px outset var(--acnt-a)'
      setTimeout(() => {
	gridPads[selectIndex].style.background = 'var(--pad-base)'
	gridPads[selectIndex].style.borderBottom = '4px outset var(--acnt-a)'
      }, 500)
      if (countInit === inputRound - 1) {
	setTimeout(() => {
	  inputSynchro = 1
	  storedSequenceArray = sequenceArray
	  clearInterval(sequenceIntervalInit)
	}, 500)
      }
      countInit += 1
    }, 700)
  }
}

seqPrime.addEventListener('click', ()=> {
  if (activeSequence === 0) {
    generateSequence(currentRounds[gridSize - 2])
    activeSequence = 1
  }
})

function padTouch(targetValue) {
  targetValue.style.transform = 'scale(98%)'
  targetValue.style.transition = '.1s'
  targetValue.style.background = 'var(--pad-active)'
  targetValue.style.transform = 'translateY(2px)'
  setTimeout(() => {
    targetValue.style.transform = 'scale(100%)'
    targetValue.style.transition = '.3s'
    targetValue.style.background = 'var(--pad-base)'
    targetValue.style.transform = 'unset'
  }, 200)
}

sectionMain.addEventListener('click', ()=> {
  if (inputSynchro === 1) {
    let eventTarget = event.target
    eventTarget.style.borderBottom = '2px outset var(--acnt-a)'
    setTimeout(()=> {
      eventTarget.style.borderBottom = '4px outset var(--acnt-a)'
    }, 200)
    let number = ''
    let numerics = [
      '1', '2', '3', 
      '4', '5', '6', 
      '7', '8', '9', 
      '0'
    ]
    for (let x = 0; x < eventTarget.id.length; x++) {
      if (numerics.includes(eventTarget.id[x])) {
	number += eventTarget.id[x]
      }
    }
    selectedItem = Number(number)
    padTouch(eventTarget)
    inputSequenceArray.push(selectedItem)
    arrayComparison(sequenceArray, inputSequenceArray, eventTarget)
  }
})

function arrayComparison(arrayA, arrayB, targetValue) {
  for (let indexValue = 0; indexValue < arrayB.length; indexValue++) {
    if (String(arrayA[indexValue]) != String(arrayB[indexValue])) {
      sequenceDesync(targetValue)
      break
    } else if (String(arrayA[indexValue]) === String(arrayB[indexValue]) && String(arrayA) === String(arrayB)) {
      if (valueCount === arrayA.length) {
	roundInit(1)
	break
      } else {
        valueCount += 1
	activeSequence = 0
      }
    }
  }
}

function roundInit(roundUp) {
  if (roundUp === 1) {
    activeSequence = 1
    fullSequenceCountPre = 0
    fullSequenceCountPost = gridSize
    fullSequenceCountBPre = 0
    fullSequenceCountBPost = 0
    let fullSequenceInterval = setInterval(()=> {
      if (fullSequenceCountPost === (gridSize * gridSize) + gridSize) {
	clearInterval(fullSequenceInterval)
      } else {
	for (let fullSequenceCountPre = 0; fullSequenceCountPre < fullSequenceCountPost; fullSequenceCountPre++) {
	  gridPads[fullSequenceCountPre].style.transition = '.7s'
	  gridPads[fullSequenceCountPre].style.opacity = '0'
	}
        fullSequenceCountPre += gridSize
        fullSequenceCountPost += gridSize
      }
    }, 70)

    setTimeout(()=> {
      let fullSequenceIntervalB = setInterval(()=> {
	if (fullSequenceCountBPost === (gridSize * gridSize) + gridSize) {
	  for (let x = 0; x < gridPads.length; x++) {
	    gridPads[x].style.transition = '.2s'
	  }
	  activeSequence = 0
	  clearInterval(fullSequenceIntervalB)
	} else {
	  for (let fullSequenceCountBPre = 0; fullSequenceCountBPre < fullSequenceCountBPost; fullSequenceCountBPre++) {
	    gridPads[fullSequenceCountBPre].style.opacity = '100'
	  }
	  fullSequenceCountBPre += gridSize
	  fullSequenceCountBPost += gridSize
	}
      }, 70)
    }, 70 * (gridPads.length / 4))
    if (pointSums[gridSize - 2] > 2) {
      flow += 1
    }
    currentRounds[gridSize - 2] += 1
    if (currentRounds[gridSize - 2] > topRounds[gridSize - 2]) {
      topRounds[gridSize - 2] = currentRounds[gridSize - 2]
      topRoundDisplay.innerText = topRounds[gridSize - 2]
      storedTopRounds = topRounds
    }
    updateDisplayValue(roundDisplay, currentRounds)
    cumuloBar += 1
    if (flow === 2) {
      pointSums[gridSize - 2] += 1
    } else if (flow === 6) {
      pointSums[gridSize - 2] += 2
    } else if (flow === 9) {
      pointSums[gridSize - 2] += 3
    } else if (flow === 12) {
      pointSums[gridSize - 2] += 4
      fruitSums[gridSize] += 1
    } else if (flow >= 15) {
      pointSums[gridSize - 2] += digiFlow
      fruitSums[gridSize] += fruitFlow
      digiFlow += 2
      fruitFlow += 1
    }
    pointSums[gridSize - 2] += 1
    if (pointSums[gridSize - 2] > highScores[gridSize - 2]) {
      highScores[gridSize - 2] = pointSums[gridSize - 2]
      highscoreDisplay.innerText = highScores[gridSize - 2]
      storedHighScores = highScores
    }
    updateDisplayValue(pointsDisplay, pointSums)
    storedSequenceArray = []
  } else {
    flow = 0
    digiFlow = 5
    fruitFlow = 1
  }
  countInit = 0
  countStored = 0
  valueCount = 1
  inputSynchro = 0
  activeSequence = 0
  sequenceArray = []
  inputSequenceArray = []
}

function playInit() {
  flow = 0
  digiFlow = 5
  fruitFlow = 1
  indexValue = 0
  for (let x = 0; x < currentRounds.length - 1; x++) {
    currentRounds[x] = 1
  }
  updateDisplayValue(roundDisplay, currentRounds)
  fruitSums[gridSize - 2] = 3
  updateDisplayValue(fruitDisplay, fruitSums)
  for (let x = 0; x < pointSums.length - 1; x++) {
    pointSums[x] = 0
  }
  updateDisplayValue(pointsDisplay, pointSums)
  countInit = 0
  countStored = 0
  inputSynchro = 0
  activeSequence = 0
  cumuloBar = 0
  sequenceArray = []
  storedSequenceArray = []
  inputSequenceArray = []
}

function sequenceDesync(inputTarget) {
  inputTarget.style.background = 'var(--pad-mis)'
  setTimeout(() => {
    inputTarget.style.background = 'var(--pad-base)'
  }, 1000)
  fruitSums[gridSize - 2] -= 1
  updateDisplayValue(fruitDisplay, fruitSums)
  if (fruitSums[gridSize - 2] >= 0) {
    roundInit()
  } else {
    playInit()
  }
  cumuloBar = 0
}

let menuToggleActive = 1
let menuToggleValue = 0
let widthCount = 0
menuToggle.addEventListener('click', ()=> {
  if (menuToggleActive === 1) {
      menuToggleActive = 0
    if (menuToggleValue === 0) {
      for (let x = 0; x < menuField.children.length; x++) {
	menuField.children[x].style.opacity = '0'
	menuField.children[x].style.transition = '.6s'
    }
      menuField.style.display = 'grid'
      widthCount = 0
      panelInterval = setInterval(()=> {
	menuField.style.width = `${widthCount}%`
	widthCount += 1
	if (widthCount > 100) {
	  clearInterval(panelInterval)
	}
      }, 1)
      setTimeout(()=> {
	let menuToggleCount = 0
	fieldInterval = setInterval(()=> {
	  menuField.children[menuToggleCount].style.opacity = '100'
	  menuToggleCount += 1
	  if (menuToggleCount === menuField.children.length) {
	    clearInterval(fieldInterval)
	  }
	}, 200)
	setTimeout(()=> {
	  menuToggleActive = 1
	}, 300)
	menuToggleValue = 1
      }, 200)
    } else if (menuToggleValue === 1) {
      activeSequence = 1
      widthCount = 100
      menuToggleCount = menuField.children.length - 1
      fieldIntervalB = setInterval(()=> {
	menuField.children[menuToggleCount].style.opacity = '0'
	menuToggleCount -= 1
	if (menuToggleCount < 0) {
	  setTimeout(()=> {
	    let gridPadCount = 0
	    let gridPadInterval = setInterval(()=> {
	      if (gridPadCount > gridPads.length - 1) {
		activeSequence = 0
		clearInterval(gridPadInterval)
	      } else {
		gridPads[gridPadCount].style.opacity = '100'
		gridPadCount += 1
	      }
	    }, 50)
	  }, 500)
	  clearInterval(fieldIntervalB)
	}
      }, 2)
      setTimeout(()=> {
	menuToggleActive = 1
      }, 300)
      setTimeout(()=> {
	panelIntervalB = setInterval(()=> {
	  menuField.style.width = `${widthCount}%`
	  widthCount -= 1
	  if (widthCount === 0) {
	    clearInterval(panelIntervalB)
	  }
	}, 2)
	setTimeout(()=> {
	  elementLoadIn()
	  menuField.style.display = 'none'
	  menuToggleValue = 0
	}, 300)
      }, 300)
    }
  }
})

function updateDisplayValue(valueItem, valueItemInnerText) {
  valueItem.style.color = 'var(--clr)'
  valueItem.style.background = '#ff000'
  setTimeout(()=> {
    valueItem.style.color = 'var(--txt)'
    if (valueItemInnerText === 0) {
      valueItem.innerText = 0
    } else {
      valueItem.innerText = Number(valueItemInnerText[gridSize - 2])
    }
  }, 500)
}

let gridSelectIndex = 0
gridSelection.addEventListener('change', ()=> {
  updateDisplayValue(pointsDisplay, pointSums)
  gridSize = Number(gridSelection.value)
  updateDisplayValue(highscoreDisplay, storedHighScores)
  updateDisplayValue(topRoundDisplay, storedTopRounds)
  localStorage.setItem('stored-grid-size', gridSize)
  for (let x = sectionMain.children.length - 1; x >= 0; x--) {
    sectionMain.removeChild(sectionMain.children[x])
  }
  sectionMain.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  sectionMain.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`
  for (let x = 0; x < gridSize * gridSize; x++) {
    let newNode = document.createElement('input')
    newNode.setAttribute('type', 'button')
    newNode.setAttribute('class', 'grid-pad')
    newNode.setAttribute('id', `grid-pad-${x}`)
    sectionMain.appendChild(newNode)
  }
  gridPads = document.querySelectorAll('.grid-pad')
  for (let x = 0; x < gridPads.length; x++) {
    gridPads[x].style.opacity = '0'
  }
  playInit()
})

themeSelection.addEventListener('change', ()=> {
  let selectedTheme = themeSelection.value
  document.documentElement.setAttribute('data-theme', selectedTheme)
  localStorage.setItem('theme', selectedTheme)
})

