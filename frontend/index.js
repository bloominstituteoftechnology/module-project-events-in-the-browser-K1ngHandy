// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', (event) => {
        // 👉 TASK 2 - Use a click handler to target a square 👈
        document.querySelector('.targeted').className = 'square'; // remove previous target
        event.stopPropagation(); // prevent mosquito img propagation
        event.currentTarget.classList.add('targeted');
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  const getTarget = () => { // get targeted square & indices
    const targeted = document.querySelector('.targeted');
    const rows = Array.from(document.querySelectorAll('.row'));
    const rowIndex = rows.findIndex(row => Array.from(row.children).includes(targeted));
    const colIndex = Array.from(rows[rowIndex].children).indexOf(targeted);
    return { rowIndex, colIndex };
  }

  document.addEventListener('keydown', evt => {
    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈
    let { rowIndex, colIndex } = getTarget();
    const rows = 5;
    const cols = 5;

    switch(evt.key) {
      case keys.up:
        rowIndex = Math.max(0, rowIndex - 1);
        break;
      case keys.down:
        rowIndex = Math.min(rows - 1, rowIndex + 1);
        break;
      case keys.left:
        colIndex = Math.max(0, colIndex - 1);
        break;
      case keys.right:
        colIndex = Math.min(cols - 1, colIndex + 1);
        break;
    }

    document.querySelector('.targeted').classList.remove('targeted'); // remove previous target
    document.querySelector('.row:nth-child(' + (rowIndex + 1) + ')').children[colIndex].classList.add('targeted'); // set new target

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈
    if (evt.key === keys.space) {
      const targeted = document.querySelector('.targeted');
      const image = targeted.querySelector('img');
      // targeted const from previous task

      if (image) {
        image.dataset.status = 'dead'
        targeted.style.backgroundColor = 'red';
      }
    }

    // 👉 TASK 5 - End the game 👈
    const remaining = Array.from(document.querySelectorAll('img')).filter(img => img.dataset.status === 'alive').length; // num of mosquitos remaining
    let count = remaining;

    if (count === 0) {
      let timeElapsed = Math.floor(getTimeElapsed() / 1000);
      document.querySelector('p').innerText = `Extermination completed in ${timeElapsed} seconds!`;
    } else {
      document.querySelector('p').innerText = `${remaining} Mosquitoes remaining`;
    }
  });
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
