
async function initProfile() {
  let email = document.querySelector('#emailField')
  let username = document.querySelector('#userField')
  let passwordButton = document.querySelector('#changePasswordButton')
  let result = {}
  try {
    result = await (await fetch(`/api/profile`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })).json()
  } catch (error) {
    console.error(error)
  }
  email.textContent = result['email']
  username.textContent = result['user']
  passwordButton.addEventListener('click', async () => {
    data = { 'password': getNewPassword() }
    let result
    try {
      result = await (await fetch('/api/updatePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })).json()
    }
    catch (ignore) { }
  })

}
function getNewPassword() {
  let passwordField = document.querySelector("#passwordField")
  if (passwordField.value != false) {
    return passwordField.value;
  } else {
    alert("Please enter new password before pressing the button.")
  }
}