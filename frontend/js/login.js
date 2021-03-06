function login() {
  checkLoggedIn()

  document.querySelector('.loginSection').innerHTML = `
      <h2>Login</h2>
      <article class="article">
      <form name="login">
      <label class="loginLabel" for="emailInput" value="EMAIL">Email</label>
      </br>
      <input id="emailInput" class="loginInput" type="email" required></input>
      </br>
      <label class="loginLabel" for="passwordInput">Password</label>
      </br>
      <input id="passwordInput" class="loginInput" type="password" required></input>
      </br>
      <p id="errorText" style="color:red" hidden>Error, Try again!</p>
      <button id="loginBtn" class="submitBtn">Log in</button><a id="signupBtn">Sign Up</a>
      </form>
      </article>
    `
  document.querySelector("#loginBtn").addEventListener("click", function (event) {
    event.preventDefault();
    loginClicked()
  })
  document.querySelector("#signupBtn").addEventListener("click", function () {
    history.pushState(null, null, '/register')
    router()
  })
}

async function checkLoggedIn() {
  let rawData = await fetch('/api/login')
  let result = await rawData.json()
  if (result._error) return
  changeRoute(result.role)
}

async function loginClicked() {
  let email = document.getElementById('emailInput').value
  let password = document.getElementById('passwordInput').value
  data = { 'email': email, 'password': password }

  let result
  try {
    result = await (await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
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
  //Redirect to new page
  changeRoute(result.role)
}

function changeRoute(role) {
  role == 'Admin' ? history.pushState(null, null, '/admin') : history.pushState(null, null, '/quizzes')
  router()
}
