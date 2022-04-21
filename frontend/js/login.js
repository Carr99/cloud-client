function login() {
  document.querySelector('.loginSection').innerHTML = `
      <div class="loginDiv">
      <h2>Login</h2>
      <article class="loginArticle">
      <label class="loginLabel" for="emailInput" value="EMAIL">Email</label>
      </br>
      <input id="emailInput" class="loginInput" type="email" required></input>
      </br>
      <label class="loginLabel" for="passwordInput">Password</label>
      </br>
      <input id="passwordInput" class="loginInput" type="password" required></input>
      </br>
      <button id="loginBtn">Log in</button><a id="signupBtn">Sign Up</a>
      </article>
      </div>
    `
  document.querySelector("#loginBtn").addEventListener("click", function () {
    alert('buttonClicked')
  })
  document.querySelector("#signupBtn").addEventListener("click", function () {
    alert('buttonClicked')
  })
}

function loginClicked() {

}