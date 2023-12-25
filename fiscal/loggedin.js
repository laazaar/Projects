const userIcon = document.querySelector(".user-icon i");
const userDropdown = document.querySelector(".user-icon_dropdown");

userIcon.onclick = () => userDropdown.classList.toggle("displayed");

const username = document.getElementById("username");

const loggedin = JSON.parse(localStorage.getItem("loggedin"));

loggedin ? (username.innerHTML = "Admin") : (username.innerHTML = "");

const loginAnchor = document.getElementById("login-anchor");

loginAnchor.innerHTML = loggedin ? "Log Out" : "Log In";
loginAnchor.href = loggedin ? "/kasica-prasica" : "./login.html";

loggedin
  ? (loginAnchor.onclick = () => localStorage.setItem("loggedin", false))
  : "";
