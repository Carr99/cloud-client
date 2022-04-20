const { render } = require("express/lib/response")

function renderQuizzes(cssSelector, quiz){

let html=""
html+='<div class="quizContainer">'
html+='<h3 id=quizName>"+quiz.name+"</h3>'
html+='<div id=quizCategory"+quiz.category+"</div>'

}

function showQuiz(quizid){
document.querySelector("main").innerHTML=renderQuizzes(".quizContainer")

}