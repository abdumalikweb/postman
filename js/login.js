const loginForm = document.getElementById("login-form");
const password = document.getElementById("password");
const username = document.getElementById("username");
const submitBtn = document.getElementById("submitBtn");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  e.preventDefault();
  let check = this.checkValidity();
  this.classList.add("was-validated");
  if (check) {
    let data = { username: username.value, password: password.value };
    submitBtn.disabled = true;
    request
      .post("auth/login", data)
      .then((res) => {
        localStorage.setItem(TOKEN, res.data.token);
        location.href = "./dashboard.html";
      })
      .catch((err) => {
        alert("Username yoki password xato  !");
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  }
});

