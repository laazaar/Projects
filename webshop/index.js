const userLogin = async () => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const error = document.getElementById("error");
  const usernameError = document.getElementById("usernameError");
  const passwordError = document.getElementById("passwordError");

  usernameError.innerHTML = "";
  passwordError.innerHTML = "";

  const responseUsers = await fetch("http://localhost:3000/users");
  const dataUsers = await responseUsers.json();

  if (username.value == "") {
    usernameError.innerHTML = "Enter a username";
    return;
  }
  if (password.value == "") {
    passwordError.innerHTML = "Enter a password";
    return;
  }

  const validUsername = dataUsers.find(
    (user) => user.username == username.value
  ).username;
  const validPassword = dataUsers.find(
    (user) => user.password == password.value
  );

  if (validUsername && validPassword) {
    const user = dataUsers.find((user) => user.username == validUsername);
    localStorage.setItem("user", JSON.stringify(user));
    if (user.admin) {
      window.open(`Admin/admin.html`, "_self");
    } else {
      window.open(`User/user.html`, "_self");
    }
  } else {
    error.innerHTML = "User doesnt exist";
  }
};
