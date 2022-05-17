let highscores

async function initScore(quizId) {

  await getScore(quizId)
  tempHtml = ``
  for (let highscore of highscores) {
    tempHtml += ` <h2>${highscore["user"]}: ${highscore["score"]}</h2>`
  }

  document.querySelector("#scoreBox").innerHTML = tempHtml
}

async function getScore(quizId) {
  let result = {}
  try {
    result = await (await fetch(`/api/highscores/${quizId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error);
  }
  highscores = result['scores']
  console.log(result)
} 