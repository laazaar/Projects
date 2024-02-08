const forma = document.getElementById("forma");

forma.onsubmit = async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const username = document.getElementById("username");
  const address = document.getElementById("address");
  const phoneNumber = document.getElementById("phoneNumber");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const sex = document.getElementById("mRadio");
  const admin = document.getElementById("admin");
  const error = document.getElementById("error");
  error.style.color = "red";

  const response = await fetch("http://localhost:3000/users");
  const data = await response.json();

  if (firstName.value == "") {
    error.innerHTML = "Enter Your Name";
    return;
  } else if (lastName.value == "") {
    error.innerHTML = "Enter Your Last Name";
    return;
  } else if (data.find((el) => el.username == username.value)) {
    error.innerHTML = "This username already exists";
    return;
  } else if (username.value == "") {
    error.innerHTML = "Enter Your Username";
    return;
  } else if (username.value.length < 5) {
    error.innerHTML = "Username must have at least 5 characters";
    return;
  } else if (address.value == "") {
    error.innerHTML = "Enter Your Address";
    return;
  } else if (phoneNumber.value == "") {
    error.innerHTML = "Enter Your Phone Number";
    return;
  } else if (password.value.length < 7) {
    error.innerHTML = "Password must have at least 7 characters";
    return;
  } else if (confirmPassword.value != password.value) {
    error.innerHTML = "Passwords do not match";
    return;
  }

  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
      address: address.value,
      phoneNumber: phoneNumber.value,
      gender: sex.checked ? "M" : "F",
      admin: admin.checked ? true : false,
    }),
  });

  window.open("../index.html", "_self");
};
