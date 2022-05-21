let quiz = ''
let quizzes = []

async function getQuizzes() {
  let result = {}
  try {
    result = await (await fetch(`/api/allQuizzes`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error);
  }
  quizzes = result['quizzes']
}
async function initQuizzes() {

  await getQuizzes()
  handleSelectBox()
  document.querySelector('.quizBox').addEventListener('click', function (e) {

    e.preventDefault()
    let aTag = e.target.closest('a');

    if (aTag == null) return

    let aTags = document.querySelectorAll('a');

    for (let currentTag of aTags) {
      currentTag.classList.remove('selected');
    }

    aTag.className = 'selected';

  })


  function handleSelectBox() {
    let selectBox = document.querySelector('#quizSelect' + ' select')

    selectBox.addEventListener('change', eventHandler)
    eventHandler({ target: selectBox })
  }
  async function eventHandler(event) {
    let table = event.target.value
    filterFunction(table)
  }


  document.querySelector("#fas").addEventListener("click", function () {

    history.pushState(null, null, '/profile')
    router()


  })


  document.querySelector("#highscoreButton").addEventListener("click", function () {
    let temp = document.querySelector(".selected")
    if (temp == null) {
      alert("You have to select a quiz before you can see its highscore!")
    } else {
      selectedQuiz = document.querySelector(".selected").textContent
      history.pushState(null, null, '/highscore')
      router()
    }
  })

  document.querySelector("#startButton").addEventListener("click", function () {
    let temp = document.querySelector(".selected")
    if (temp == null) {
      alert("Please select a quiz before attempting to start it!")
    } else {
      selectedQuiz = document.querySelector(".selected").textContent
      history.pushState(null, null, '/question')
      router()
    }
  })

  document.querySelector("#downloadButton").addEventListener("click", function () {
    let temp = document.querySelector(".selected")
    if (temp == null) {
      alert("Please select a quiz before attempting to download it")
    } else {
      selectedQuiz = document.querySelector(".selected").textContent
      storeQuiz(selectedQuiz)
    }
  })

}
function filterFunction(category) {
  let temporaryHtml = ''

  for (const quiz of quizzes) {

    if (category == "All") {

      temporaryHtml += `<a href="javascript:void(0)" id=${quiz["name"]}>${quiz["name"]}</a></br>`
    }

    if (quiz['category'] == category) {

      temporaryHtml += `<a href="javascript:void(0)" id=${quiz["name"]}>${quiz["name"]}</a></br>`
    }

  }
  document.querySelector(".quizBox").innerHTML = temporaryHtml

}


async function storeQuiz(quizId) {
  let result = {}
  try {
    result = await (await fetch(`/api/quiz/${quizId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error)
  }
  window.localStorage.setItem(quizId,
    JSON.stringify(result['quizzes'])
  )
}
