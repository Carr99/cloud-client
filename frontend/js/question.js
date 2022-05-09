

let questions = [];
let answer = '';
let options = [];
let quizz = ''
let index = 0
let points = 0
let existingScore = false;

function initQuestions(quizzId) {
  quizz = quizzId
  getQuestions()
  document.querySelector("#topLeftAnswer").addEventListener("click", function () {
    if (options[0] == answer) {
      points++
    }
    loadQuestion()
  })
  document.querySelector("#topRightAnswer").addEventListener("click", function () {
    if (options[1] == answer) {
      points++
    }
    loadQuestion()
  })
  document.querySelector("#bottomLeftAnswer").addEventListener("click", function () {
    if (options[2] == answer) {
      points++
    }
    loadQuestion()
  })
  document.querySelector("#bottomRightAnswer").addEventListener("click", function (event) {
    if (options[3] == answer) {
      points++
    }
    loadQuestion()
  })
}

async function getQuestions() {
  index = 0
  let result = {}
  try {
    result = await (await fetch(`/api/quiz/${quizz}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error)
  }
  questions = result['quizzes']
  loadQuestion()
}
async function loadQuestion() {
  if (index < questions.length) {
    answer = questions[index]['answer']
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
    let scores;
    scores = await (await fetch(`/api/highscores/${quizz}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
    console.log(scores)
    scores['scores'].forEach(async score => {
      if (score['user'] == scores['loggedUser']) {
        existingScore = true;
        if (points > score['score']) {
          let body = { quizz: quizz, score: points }
          await fetch(`/api/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
        }

      }
    });
    if (!existingScore) {
      let body = { quizz: quizz, score: points }
      await fetch(`/api/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    }



  }

}