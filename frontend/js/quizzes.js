
let quiz =''
let quizzes =[]
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
  quizzes=result['quizzes']
  console.log(result)
}








function initQuizzes(){

  console.log("Intializing...")
  getQuizzes()

document.querySelector("#filterButton").addEventListener("click", function () {
filterFunction(document.querySelector("#quizSelect").value)
console.log("You filtered...")
console.log(document.querySelector("#quizSelect").value)

})
document.querySelector(".highscoreButton").addEventListener("click", function () {

//Code for moving to the highscorepage

})

document.querySelector(".startButton").addEventListener("click", function () {

let category = document.querySelector(".quizBox").getText()

//Get quiz id and pass it to the question page and load it.


})

}

function filterFunction(category){
console.log("In filter function...")
let temporaryHtml = ''
  
for (const quiz of quizzes) {
  
if(category=="All"){

  temporaryHtml+=`<li id=${quiz["name"]}>${quiz["name"]}</li>`}




if(quiz['category']==category){
 
temporaryHtml+=`<li id=${quiz["name"]}>${quiz["name"]}</li>`}

}
console.log(temporaryHtml)
document.querySelector(".quizBox").innerHTML=temporaryHtml

}