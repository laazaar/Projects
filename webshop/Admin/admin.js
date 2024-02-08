let dataCategories;
let userId;

const writeData = async () => {
  userId = JSON.parse(localStorage.getItem("user")).id;

  const responseUser = await fetch(`http://localhost:3000/users/${userId}`);
  const dataUser = await responseUser.json();

  if (!dataUser.admin) {
    window.open("../User/user.html", "_self");
  }
  document.getElementById("profileImage").src = dataUser.profileImage;
  document.getElementById("name").innerHTML =
    dataUser.firstName + " " + dataUser.lastName;
  document.getElementById("username").innerHTML = dataUser.username;
  document.getElementById("address").innerHTML = dataUser.address;
  document.getElementById("phoneNumber").innerHTML = dataUser.phoneNumber;
  document.getElementById("gender").innerHTML =
    dataUser.gender == "M" ? "Male" : "Female";

  const responseCategories = await fetch(`http://localhost:3000/categories`);
  dataCategories = await responseCategories.json();

  writeCategories(dataCategories);
};

writeData();

const writeCategories = (dataCategories) => {
  const categoryContainer = document.getElementById("allCategories");

  categoryContainer.innerHTML = "";

  for (const el of dataCategories) {
    const container = document.createElement("div");
    categoryContainer.appendChild(container);

    const imgDiv = document.createElement("div");
    container.appendChild(imgDiv);
    const img = document.createElement("img");
    imgDiv.appendChild(img);
    img.src = el.image;

    const asidePart = document.createElement("div");
    container.appendChild(asidePart);

    const categoryName = document.createElement("div");
    asidePart.appendChild(categoryName);
    categoryName.classList.add("category-name");
    categoryName.innerHTML = el.name;

    const buttonContainer = document.createElement("div");
    container.appendChild(buttonContainer);
    buttonContainer.classList.add("button-container");

    const editButton = document.createElement("button");
    buttonContainer.appendChild(editButton);
    editButton.innerHTML = "Edit";

    const deleteButton = document.createElement("button");
    buttonContainer.appendChild(deleteButton);
    deleteButton.innerHTML = "Delete";

    editButton.onclick = () => addEditCategory(el.id);

    const deleteContainer = document.getElementById("deleteContainer");
    deleteButton.onclick = () => {
      deleteContainer.style.display = "grid";
      deleteFunc(container, el.id, deleteContainer);
    };
  }
};

const filter = () => {
  const categoryNameFilter = document.getElementById("categoryName").value;

  const filteredDataCategories = dataCategories.filter((el) =>
    el.name.toLowerCase().includes(categoryNameFilter.toLowerCase())
  );

  writeCategories(filteredDataCategories);
};

const previewImage = document.getElementById("previewImage");
const imgInput = document.getElementById("imgInput");
const nameInput = document.getElementById("nameInput");
const addEditContainer = document.getElementById("addEdit");
const addEditParent = addEditContainer.parentNode;
const cancelAddEdit = document.getElementById("addEditCancel");

const addEditCategory = (edit) => {
  cancelAddEdit.onclick = () => {
    addEditParent.classList.remove("visible");
    addEditContainer.setAttribute("hidden", "hidden");
    document.querySelector("body").classList.remove("addEditVisible");
  };

  addEditParent.classList.add("visible");

  document.querySelector("body").classList.add("addEditVisible");

  document.getElementById("error").innerHTML = "";
  previewImageFunc();
  const button = document.getElementById("addEditSubmit");
  const addEditForm = document.getElementById("addEditForm");

  addEditContainer.removeAttribute("hidden");

  button.innerHTML = edit ? "Update" : "Add";

  imgInput.value = edit ? dataCategories.find((el) => el.id == edit).image : "";
  previewImage.src = edit
    ? imgInput.value
    : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
  nameInput.value = edit ? dataCategories.find((el) => el.id == edit).name : "";

  addEditForm.onsubmit = (e) => {
    e.preventDefault();
    addEditSubmit(edit);
  };
};

const addEditSubmit = async (edit) => {
  if (imgInput.value == "" || nameInput.value == "") {
    document.getElementById("error").innerHTML = "Please fill every input";
    return;
  }

  const checkExisting = dataCategories.find(
    (el) => el.name.toLowerCase() == nameInput.value.toLowerCase()
  );

  if (edit) {
    if (!checkExisting || checkExisting.id == edit) {
      await fetch(`http://localhost:3000/categories/${edit}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value,
          image: imgInput.value,
        }),
      });
    } else {
      document.getElementById("error").innerHTML =
        "Category name already exists";
      return;
    }
  } else {
    if (checkExisting) {
      document.getElementById("error").innerHTML =
        "Category name already exists";
      return;
    }
    await fetch(`http://localhost:3000/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imgInput.value,
      }),
    });
  }

  addEditContainer.setAttribute("hidden", "hidden");
  addEditParent.classList.remove("visible");
  document.querySelector("body").classList.remove("addEditVisible");
  writeData();
};

const previewImageFunc = () => {
  previewImage.src =
    imgInput.value != ""
      ? imgInput.value
      : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
};

const logout = () => {
  localStorage.removeItem("user");
  window.open(`../index.html`, "_self");
};

const deleteFunc = (container, elementId, deleteContainer) => {
  document.getElementById("deleteCancel").onclick = () =>
    (deleteContainer.style.display = "none");

  document.getElementById("deleteYes").onclick = async () => {
    const responseAds = await fetch(
      `http://localhost:3000/ads?categoryId=${elementId}`
    );
    const dataAds = await responseAds.json();

    console.log(dataAds);

    container.remove();

    for (el of dataAds) {
      await fetch(`http://localhost:3000/ads/${el.id}`, {
        method: "DELETE",
      });
    }

    await fetch(`http://localhost:3000/categories/${elementId}`, {
      method: "DELETE",
    });

    deleteContainer.style.display = "none";
  };
};
