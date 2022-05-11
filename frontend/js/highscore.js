let highscores
let users
async function initScore(quizId) {

  await getScore(quizId)
  await getUsers()
  console.log(highscores)
  tempHtml = ``
  for (const highscore of highscores) {
    
    for (const user of users) {
      if (highscore['user'] == user['id']) {
        console.log(user)
        tempHtml += `<h2  id=${user["id"]}>${user["data"]["username"]}: ${highscore["score"]}</h2>`
      }
    }

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

async function getUsers() {
  let result = {}
  try {
    result = await (await fetch(`/api/allUsers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error);
  }
  users = result['users']
  console.log(result)
}