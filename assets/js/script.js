
// variables
let sectionMain = document.getElementById('section-main')
let seqPrime = document.getElementById('seq-prime')
let roundDisplay = document.getElementById('round-display')
let pointsDisplay = document.getElementById('points-display')
let multiDisplay = document.getElementById('multi-display')
let fruitDisplay = document.getElementById('fruit-display')
let highscoreDisplay = document.getElementById('highscore-display')
let menuField = document.getElementById('menu-field')
let menuToggle = document.getElementById('menu-toggle')
let gridSelection = document.getElementById('grid-selection')

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

let gridSize = 4
let indexValue = 0
let inputSynchro = 0
let activeSequence = 0
let cumuloBar = 0
let count = 0
let valueCount = 1
let sequenceArray = []
let inputSequenceArray = []

// retrieve store
let storedHighScore2 = localStorage.getItem('high-score-2')
let storedHighScore3 = localStorage.getItem('high-score-3')
let storedHighScore4 = localStorage.getItem('high-score-4')
let storedHighScore5 = localStorage.getItem('high-score-5')
let storedHighScore6 = localStorage.getItem('high-score-6')
let storedHighScore7 = localStorage.getItem('high-score-7')

let storedHighScores = [
  storedHighScore2, storedHighScore3, 
  storedHighScore4, storedHighScore5, 
  storedHighScore6, storedHighScore7
]

let storedGridSize = localStorage.getItem('stored-grid-size')

if (storedGridSize) {
  highscoreDisplay.innerText = Number(storedHighScores[storedGridSize - 1])
}

roundDisplay.innerText = currentRounds[gridSize - 2]
pointsDisplay.innerText = Number(pointSums[gridSize - 2])
multiDisplay.innerText = Number(multiSums[gridSize - 2])
fruitDisplay.innerText = Number(fruitSums[gridSize - 2])
highscoreDisplay.innerText = Number(highScores[gridSize - 2])

for (let x = 0; x < gridSize; x++) {
  let newNode = document.createElement('input')
  newNode.setAttribute('type', 'button')
  newNode.setAttribute('class', 'grid-pad')
  newNode.setAttribute('id', `grid-pad-${x}`)
  sectionMain.appendChild(newNode)
}
let gridPads = document.querySelectorAll('.grid-pad')

function generateSequence(inputRound) {
  let sequenceInterval = setInterval(() => {
    let selectIndex = Math.floor(Math.random(1) * (gridPads.length))
    sequenceArray.push(selectIndex)
    gridPads[selectIndex].style.background = 'var(--pad-active'
    setTimeout(() => {
      gridPads[selectIndex].style.background = 'var(--pad-base)'
    }, 500)
    if (count === inputRound - 1) {
      setTimeout(() => {
	inputSynchro = 1
	clearInterval(sequenceInterval)
      }, 500)
    }
    count += 1
  }, 900)
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
  setTimeout(() => {
    targetValue.style.transform = 'scale(100%)'
    targetValue.style.transition = '.3s'
    targetValue.style.background = 'var(--pad-base)'
  }, 200)
}

sectionMain.addEventListener('click', ()=> {
  if (inputSynchro === 1) {
    let eventTarget = event.target
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
    currentRounds[gridSize - 2] += 1
    roundDisplay.innerText = currentRounds[gridSize - 2]
    cumuloBar += 1

    pointSums[gridSize - 2] += 1
    if (pointSums[gridSize - 2] > highScores[gridSize - 2]) {
      highScores[gridSize - 2] = pointSums[gridSize - 2]
      highscoreDisplay.innerText = pointSums[gridSize - 2]
      localStorage.setItem(`high-score-${gridSize}`, highScores[gridSize - 2])
    }
    pointsDisplay.innerText = pointSums[gridSize - 2]
  }
  count = 0
  valueCount = 1
  inputSynchro = 0
  activeSequence = 0
  sequenceArray = []
  inputSequenceArray = []
}

function playInit() {
  indexValue = 0
  currentRounds[gridSize - 2] = 1
  roundDisplay.innerText = currentRounds[gridSize - 2]

  fruitSums[gridSize - 2] = 3
  fruitDisplay.innerText = fruitSums[gridSize - 2]
  count = 0
  inputSynchro = 0
  activeSequence = 0
  cumuloBar = 0
  sequenceArray = []
  inputSequenceArray = []
}

function sequenceDesync(inputTarget) {
  inputTarget.style.background = 'var(--pad-mis)'
  setTimeout(() => {
    inputTarget.style.background = 'var(--pad-base)'
  }, 1000)
  fruitSums[gridSize] -= 1
  fruitDisplay.innerText = fruitSums[gridSize]
  if (fruitSums[gridSize] > 0) {
    pointSums[gridSize] -= 1
    roundInit()
  } else {
    playInit()
  }
  pointsDisplay.innerText = Number(pointSums[gridSize])
  cumuloBar = 0
}

menuToggleValue = 0
menuToggle.addEventListener('click', ()=> {
  if (menuToggleValue === 0) {
    menuField.style.display = 'grid'
    menuToggleValue = 1
  } else if (menuToggleValue === 1) {
    menuField.style.display = 'none'
    menuToggleValue = 0
  }
})

menuField.addEventListener('dblclick', ()=> {
  menuField.style.display = 'none'
})

let gridSelectIndex = 0
gridSelection.addEventListener('change', ()=> {
  gridSize = Number(gridSelection.value)
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
  pointsDisplay.innerText = pointSums[gridSize - 2]
  highscoreDisplay.innerText = Number(storedHighScores[storedGridSize - 2])
  playInit()
})
