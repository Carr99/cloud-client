function admin() {
  handleSelectBox()

}

function handleSelectBox() {
  let selectBox = document.querySelector('.selectBox' + ' select')

  selectBox.addEventListener('change', eventHandler)
  eventHandler({ target: selectBox })
}

async function eventHandler(event) {
  let table = event.target.value
  if (table === 'Quizzes') {
    renderQuizInfo()
  } else if (table === 'Users') {
    renderUserInfo()
  }
}

async function renderQuizInfo() {
  let html = '<table><thead><tr><th>Quiz Name</th><th>Questions</th></tr></thead><tbody>'
  let rawData = await fetch('http://localhost:3002/allQuizzes')
  let result = await rawData.json()
  for (let quiz of result.quizzes) {
    html += '<tr><td>' + quiz.name + '</td><td>' + quiz.questions + '</td></tr>'
  }

  html += '</tbody></table></article>'
  document.querySelector('.adminTable').innerHTML = html
}

async function renderUserInfo() {
  let html = '<table><thead><tr><th>Username</th><th>Role</th></tr></thead><tbody>'
  let rawData = await fetch('http://localhost:3002/allUsers')
  let result = await rawData.json()
  for (let user of result.users) {
    html += '<tr><td>' + user.username + '</td><td>' + user.userRole + '</td></tr>'
  }

  html += '</tbody></table></article>'
  document.querySelector('.adminTable').innerHTML = html
}