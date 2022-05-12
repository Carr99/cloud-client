

let questions = [];
let answer = '';
let options = [];
let quizz = ''
let index = 0
let points = 0
let interval
let existingScore = false

function initQuestions(quizzId) {
  quizz = quizzId
  getQuestions(quizzId)
  document.querySelector("#topLeftAnswer").addEventListener("click", function () {
    if (options[0] == answer) {
      points++
    }
    loadQuestion(quizzId)
  })
  document.querySelector("#topRightAnswer").addEventListener("click", function () {
    if (options[1] == answer) {
      points++
    }
    loadQuestion(quizzId)
  })
  document.querySelector("#bottomLeftAnswer").addEventListener("click", function () {
    if (options[2] == answer) {
      points++
    }
    loadQuestion(quizzId)
  })
  document.querySelector("#bottomRightAnswer").addEventListener("click", function (event) {
    if (options[3] == answer) {
      points++
    }
    loadQuestion(quizzId)
  })
}

async function getQuestions(quizId) {
  index = 0
  let result = {}
  if (window.localStorage.getItem(quizId)) {
    questions = JSON.parse(window.localStorage.getItem(quizId))

    console.log(questions)
  } else {
    try {
      result = await (await fetch(`/api/quiz/${quizz}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })).json()
    } catch (error) {
      console.error(error)
    }
    questions = result['quizzes']
  }
  console.log('loading questions')
  loadQuestion()
}
async function loadQuestion(quizId) {
  if (index < questions.length) {
    answer = questions[index]['answer']
    console.log(questions)
    console.log(questions[index])
    options = [questions[index]['option1'], questions[index]['option2'], questions[index]['option3'], questions[index]['answer']]
    options.sort(() => Math.random() - 0.5)
    document.querySelector('#question').textContent = questions[index]['name']
    document.querySelector('#topLeftAnswer').textContent = options[0]
    document.querySelector('#topRightAnswer').textContent = options[1]
    document.querySelector('#bottomLeftAnswer').textContent = options[2]
    document.querySelector('#bottomRightAnswer').textContent = options[3]
    index++
  } else {
    alert(`Your score: ${points}`)
    saveScore(quizId, points)
  }
}

async function saveScore(quizzId, finalScore) {
  let connected = await checkConnection()
  if (connected) {
    console.log("got connection while saving")
    let scores;
    scores = await (await fetch(`/api/highscores/${quizzId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
    scores['scores'].forEach(async score => {
      if (score['user'] == scores['loggedUser']) {
        existingScore = true;
        if (finalScore > score['score']) {
          let body = { quizz: quizz, score: finalScore }
          await fetch(`/api/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
        }

      }
    });
    if (!existingScore) {
      let body = { quizz: quizz, score: finalScore }
      await fetch(`/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    }
    history.pushState(null, null, '/quizzes')
    router()
  } else {
    console.log("no connection while saving")
    alert("you are currently offline, but dont worry! your score will be saved as soon as you become online!")
    interval = setInterval(reConnect, 5000)
    let score = { 'quiz': quizz, 'score': finalScore }
    window.localStorage.setItem('localScore', score)
  }
}
async function checkConnection() {
  try {
    const headers = new Headers();
    headers.append('Cache-Control', 'no-cache');
    let response = await fetch('https://www.google.com', {
      mode: 'no-cors'
    })

    if (response.status != 200) {
      return true
    }
  } catch (err) {
    return false
  }

}
async function reConnect() {
  let connected = await checkConnection()
  if (connected && window.localStorage.getItem('localScore')) {
    this.alert("reconnected, saving your score!")
    saveScore(this.window.localStorage.getItem('localScore')['quiz'], window.localStorage.getItem('localScore')['points'])
    this.window.localStorage.removeItem('localScore')
    clearInterval(interval)
  }
}