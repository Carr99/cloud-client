function register() {
  document.querySelector('.registerSection').innerHTML = `
      <h2>Register</h2>
      <article class="article">
      <form name="register">
      <label class="loginLabel" for="usernmaeInput">Username</label>
      </br>
      <input id="usernameInput" class="loginInput" type="text" required></input>
      </br>
      <label class="loginLabel" for="emailInput">Email</label>
      </br>
      <input id="emailInput" class="loginInput" type="email" required></input>
      </br>
      <label class="loginLabel" for="passwordInput">Password</label>
      </br>
      <input id="passwordInput" class="loginInput" type="password" minlength="6" required></input>
      </br>
      <label class="loginLabel" for="secondPasswordInput">Repeat Password</label>
      </br>
      <input id="secondPasswordInput" class="loginInput" type="password" minlength="6" required></input>
      </br>
      <p id="errorText" style="color:red" hidden>Error, Try again!</p>
      <button id="submitBtn" class="submitBtn">Submit</button>
      </form>
      </article>
    `
  document.querySelector("#submitBtn").addEventListener("click", function (event) {
    event.preventDefault();
    createUser()
  })
}

async function createUser() {
  let username = document.getElementById('usernameInput').value
  let email = document.getElementById('emailInput').value
  let password = document.getElementById('passwordInput').value
  let repeatedPassword = document.getElementById('secondPasswordInput').value
  if (password !== repeatedPassword) {
    document.getElementById('errorText').hidden = false
    return
  }
  data = { 'username': username, 'email': email, 'password': password }

  let result
  try {
    result = await (await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })).json()
  }
  catch (ignore) { }

  if (!result) {
    document.getElementById('errorText').hidden = false
    return
  } else {
    if (result.email !== email) {
      document.getElementById('errorText').hidden = false
      return
    }
  }

  document.getElementById('errorText').hidden = true

  history.pushState(null, null, '/quizzes')
  router()
}