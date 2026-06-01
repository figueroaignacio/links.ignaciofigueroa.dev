const outputDiv = document.getElementById('output')
const inputEl = document.getElementById('input')

// ASCII arts
const rocketArt = `
           .
          / \\
         /   \\
        /     \\
       /       \\
      /         \\
     |   ( I )   |
     |   ( G )   |
     |   ( N )   |
     |   ( A )   |
     |   ( C )   |
     |   ( I )   |
     |   ( O )   |
    /|   /   \\   |\\
   / |  /     \  | \\
  /  | /       \\ |  \\
 |  /|/         \\|   |
 | / |           |   |
 |/  |           |   |
     |  _______  |
     ( /       \\ )
      \\         /
       \\       /
        \\     /
         \\   /
          \\ /
           V
      `

const alienArt = `
         .-''''-.
        /  _  _  \\
       |  (o)(o)  |
       |    __    |
       |   /  \\   |
        \\  \\__/  /
         '-____-'
      `

const welcomeMsg = `
    _   _   _  _____  _  ____  ____  ____  _   _   _  _
   / \\ / \\ / \\/__ __\\/ \\/  __\\/  _ \\/  _ \\/ \\ / \\ / \\/ \\
   | | | | | |  / \\  | ||  \\/|| / \\|| | \\|| | | | | || |
   | | | | | |  | |  | ||  __/| |-|||| |_/|| \\_/| | \\_/|
   \\_/ \\_/ \\_/  \\_/  \\_/\\_/   \\_/ \\|\\____/\\____/ \\____/
      `

// Print first art on startup after a minor delay
setTimeout(() => {
  printText(welcomeMsg, 'ascii-art')
}, 500)

// Focus input on body click
document.body.addEventListener('click', () => {
  inputEl.focus()
})

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const rawInput = inputEl.value
    const cmd = rawInput.trim().toLowerCase()
    inputEl.value = ''

    // Print prompt + command
    printLine(`λ ~ ${rawInput}`, 'accent-msg')

    if (cmd) {
      handleCommand(cmd)
    }
  }
})

function handleCommand(cmd) {
  const args = cmd.split(' ')
  const primaryCmd = args[0]

  switch (primaryCmd) {
    case 'help':
      printLine('Available Commands:', 'success-msg')
      printLine('  art      - Display the secret rocket ASCII art')
      printLine('  alien    - Reveal extraterrestrial presence')
      printLine('  about    - Info about the developer and Antigravity')
      printLine('  matrix   - Enter the matrix code simulation')
      printLine('  clear    - Clear the terminal screen')
      printLine('  exit     - Return to the normal world')
      break
    case 'art':
      printText(rocketArt, 'ascii-art')
      break
    case 'alien':
      printText(alienArt, 'ascii-art')
      printLine(
        'Greetings, human. We come in peace... and clean code.',
        'success-msg',
      )
      break
    case 'about':
      printLine(
        'Ignacio Figueroa is a Fullstack & AI Developer who builds blazing-fast and intelligent systems.',
        'system-msg',
      )
      printLine(
        'This secret area is powered by the Antigravity AI pair programming engine.',
        'system-msg',
      )
      break
    case 'matrix':
      printLine('Entering the matrix... (type any key to stop)', 'success-msg')
      startMatrixEffect()
      break
    case 'clear':
      outputDiv.innerHTML = ''
      break
    case 'exit':
      window.location.href = './index.html'
      break
    default:
      printLine(
        `Command not found: '${primaryCmd}'. Type 'help' for a list of commands.`,
        'system-msg',
      )
  }

  // Scroll to bottom
  setTimeout(() => {
    outputDiv.scrollTop = outputDiv.scrollHeight
  }, 10)
}

function printLine(text, className = '') {
  const div = document.createElement('div')
  div.textContent = text
  if (className) div.className = className
  outputDiv.appendChild(div)
}

function printText(text, className = '') {
  const pre = document.createElement('pre')
  pre.textContent = text
  if (className) pre.className = className
  outputDiv.appendChild(pre)
}

// Matrix effect simulation
let matrixInterval
function startMatrixEffect() {
  // Disable typing in main input temporarily
  inputEl.disabled = true

  const matrixDiv = document.createElement('pre')
  matrixDiv.className = 'ascii-art'
  matrixDiv.style.color = '#22c55e'
  matrixDiv.style.textShadow = '0 0 5px rgba(34, 197, 94, 0.8)'
  outputDiv.appendChild(matrixDiv)

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%*+=-/\\|'
  const cols = 40
  let rows = 0

  matrixInterval = setInterval(() => {
    let line = ''
    for (let i = 0; i < cols; i++) {
      line +=
        Math.random() > 0.85
          ? chars[Math.floor(Math.random() * chars.length)]
          : ' '
    }
    matrixDiv.textContent += line + '\n'
    rows++
    outputDiv.scrollTop = outputDiv.scrollHeight

    if (rows > 25) {
      stopMatrix()
    }
  }, 100)

  function stopMatrix() {
    clearInterval(matrixInterval)
    inputEl.disabled = false
    inputEl.focus()
    printLine('Matrix simulation terminated.', 'system-msg')
  }

  // Allow stopping early by typing/clicking
  const stopHandler = () => {
    stopMatrix()
    document.removeEventListener('keydown', stopHandler)
  }
  document.addEventListener('keydown', stopHandler)
}
