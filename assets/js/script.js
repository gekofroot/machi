
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

let currentRound = 1
let highScore = 0
let pointSum = 0
let multiSum = 0
let fruitSum = 3
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
let storedHighScore = localStorage.getItem('high-score')
if (storedHighScore) {
  highscoreDisplay = Number(storedHighScore)
}


roundDisplay.innerText = currentRound
pointsDisplay.innerText = pointSum
multiDisplay.innerText = multiSum
fruitDisplay.innerText = fruitSum
highscoreDisplay.innerText = highScore

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
    let selectIndex = Math.floor(Math.random(1) * gridSize)
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
    generateSequence(currentRound)
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
    selectedItem = eventTarget.id.slice(-1)
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
    currentRound += 1
    roundDisplay.innerText = currentRound
    cumuloBar += 1
    pointSum += 1
    if (pointSum > highScore) {
      highScore = pointSum
      highscoreDisplay.innerText = pointSum
      localStorage.setItem('high-score', highScore)
    }
    pointsDisplay.innerText = pointSum
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
  currentRound = 1
  roundDisplay.innerText = currentRound
  fruitSum = 3
  fruitDisplay.innerText = fruitSum
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
  fruitSum -= 1
  fruitDisplay.innerText = fruitSum
  if (fruitSum > 0) {
    pointSum -= 1
    roundInit()
  } else {
    playInit()
  }
  pointsDisplay.innerText = pointSum
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

menuField.addEventListener('click', ()=> {
  menuField.style.display = 'none'
})

