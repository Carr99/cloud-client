let questions = [];
let answer = '';
let options = [];
let quizz = 'Soccer quiz'

async function getQuestions() {
  let result = {}
  try {
    result = await (await fetch(`http://localhost:3002/quiz/${quizz}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error);
  }

  console.log(result);
}
getQuestions();