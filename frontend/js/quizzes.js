
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
  console.log(result)
}
async function initQuizzes() {

  console.log("Intializing...")
  await getQuizzes()
  handleSelectBox()
  document.querySelector('.quizBox').addEventListener('click', function (e) {


    e.preventDefault()
    let aTag = e.target.closest('a');
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
  

  document.querySelector(".fas").addEventListener("click",function(){

    history.pushState(null, null, '/profile')
    router()
    
  
  })


  document.querySelector("#highscoreButton").addEventListener("click", function () {

    selectedQuiz = document.querySelector(".selected").textContent
    console.log(selectedQuiz)
    if (!selectedQuiz == false) {
      history.pushState(null, null, '/highscore')
      router()
    } else {
      alert("Please select a quiz before you try to start!")
    }

  })

  document.querySelector("#startButton").addEventListener("click", function () {
    selectedQuiz = document.querySelector(".selected").textContent
    console.log(selectedQuiz)
    if (!selectedQuiz == false) {
      history.pushState(null, null, '/question')
      router()
    } else {
      alert("Please select a quiz before you try to start!")
    }

  })
  document.querySelector("#downloadButton").addEventListener("click", function () {
    selectedQuiz = document.querySelector(".selected").textContent
    storeQuiz(selectedQuiz)
    console.log("You downloaded: "+selectedQuiz)

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
  console.log(temporaryHtml)
  document.querySelector(".quizBox").innerHTML = temporaryHtml

}

function getCurrentQuiz() {

  console.log("The current quiz is: ", currentQuiz)

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
    console.log(result)
    window.localStorage.setItem(quizId,
      JSON.stringify(result['quizzes'])
    )
}
