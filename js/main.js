const sidebar = document.querySelector("aside");
const sidebarToggle = document.querySelector(".hamburger");
const fullName = document.querySelector(".avatar span");
const logout = document.querySelector(".logout");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

const body = document.body;
const modeToggle = document.querySelector(".switch");

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
});

request.get("auth/me").then((res) => {
  fullName.innerHTML = res.data.data.first_name + " " + res.data.data.last_name;
});

logout.addEventListener("click", function () {
  localStorage.removeItem(TOKEN);
  location.href = "./index.html";
});
