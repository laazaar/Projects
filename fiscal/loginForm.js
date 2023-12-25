const loginForm = document.getElementById("login-form");

loginForm.onsubmit = (e) => {
  e.preventDefault();
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;
  const loginError = document.getElementById("loginError");

  if (loginUsername == "Admin123" && loginPassword == "admin@password") {
    window.location = "/kasica-prasica";
    localStorage.setItem("loggedin", true);
  } else {
    loginError.innerHTML = "Username or Password is not correct.";
  }
};
