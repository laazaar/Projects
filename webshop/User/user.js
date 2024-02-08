let userId;
let dataAds;
let dataCategories;

const writeData = async () => {
  userId = JSON.parse(localStorage.getItem("user")).id;

  const responseUser = await fetch(`http://localhost:3000/users/${userId}`);
  const dataUser = await responseUser.json();

  if (dataUser.admin) {
    window.open("../Admin/admin.html", "_self");
  }

  document.getElementById("profileImage").src = dataUser.profileImage;
  document.getElementById("name").innerHTML =
    dataUser.firstName + " " + dataUser.lastName;
  document.getElementById("username").innerHTML = dataUser.username;
  document.getElementById("address").innerHTML = dataUser.address;
  document.getElementById("phoneNumber").innerHTML = dataUser.phoneNumber;
  document.getElementById("gender").innerHTML =
    dataUser.gender == "M" ? "Male" : "Female";

  const responseAds = await fetch(`http://localhost:3000/ads?userId=${userId}`);
  dataAds = await responseAds.json();

  const responseCategories = await fetch(`http://localhost:3000/categories`);
  dataCategories = await responseCategories.json();

  const filterSelect = document.getElementById("filterSelect");
  filterSelect.innerHTML = "";
  const showAllOption = document.createElement("option");
  filterSelect.appendChild(showAllOption);
  showAllOption.innerHTML = "Show All";
  showAllOption.value = "all";

  for (const el of dataCategories) {
    const option = document.createElement("option");
    option.innerHTML = el.name;
    option.value = el.id;
    filterSelect.appendChild(option);
  }

  writeAds(dataAds);
};

writeData();

const writeAds = (dataAds) => {
  const adsContainer = document.getElementById("allAds");

  adsContainer.innerHTML = "";

  for (const el of dataAds) {
    const container = document.createElement("div");
    adsContainer.appendChild(container);

    const imgDiv = document.createElement("div");
    container.appendChild(imgDiv);
    const img = document.createElement("img");
    imgDiv.appendChild(img);
    img.src = el.image;

    const asidePart = document.createElement("div");
    container.appendChild(asidePart);
    asidePart.classList.add("aside-part");

    const categoryName = document.createElement("div");
    asidePart.appendChild(categoryName);
    categoryName.innerHTML =
      "Category: " +
      dataCategories.find((category) => category.id == el.categoryId).name;

    const adName = document.createElement("div");
    asidePart.appendChild(adName);
    adName.innerHTML = el.title;

    const adDesc = document.createElement("div");
    asidePart.appendChild(adDesc);
    adDesc.classList.add("description");
    adDesc.innerHTML = el.description;

    const smallContainer = document.createElement("div");
    asidePart.appendChild(smallContainer);
    smallContainer.classList.add("small-container");

    const likes = document.createElement("div");
    smallContainer.appendChild(likes);
    likes.innerHTML = `<i class="fa-solid fa-heart"></i> ${el.likes.length}`;

    const views = document.createElement("div");
    smallContainer.appendChild(views);
    views.innerHTML = `<i class="fa-solid fa-eye"></i> ${el.views}`;

    let ratingInfo = 0;
    for (let rating of el.rating) {
      ratingInfo += rating.stars;
    }
    const rating = document.createElement("div");
    smallContainer.appendChild(rating);
    rating.innerHTML = `<i class="fa-solid fa-star"></i> ${
      el.rating.length != 0 ? (ratingInfo / el.rating.length).toFixed(1) : 0
    }`;

    const smallContainer2 = document.createElement("div");
    asidePart.appendChild(smallContainer2);
    smallContainer2.classList.add("small-container-2");

    const price = document.createElement("div");
    smallContainer2.appendChild(price);
    price.innerHTML = `$${el.price.toLocaleString()}`;

    const buttonContainer = document.createElement("div");
    smallContainer2.appendChild(buttonContainer);

    const editButton = document.createElement("button");
    buttonContainer.appendChild(editButton);
    editButton.innerHTML = "Edit";

    const deleteButton = document.createElement("button");
    buttonContainer.appendChild(deleteButton);
    deleteButton.innerHTML = "Delete";

    editButton.onclick = () => addEditAds(el.id, el.categoryId);

    const deleteContainer = document.getElementById("deleteContainer");
    deleteButton.onclick = () => {
      deleteContainer.style.display = "grid";
      deleteFunc(container, el.id, deleteContainer);
    };
  }
};

const filter = (e) => {
  let filteredDataAds = dataAds.filter((el) => el.categoryId == e.value);

  if (e.value == "all") {
    filteredDataAds = dataAds;
  }

  writeAds(filteredDataAds);
};

const previewImage = document.getElementById("previewImage");
const imgInput = document.getElementById("imgInput");
const nameInput = document.getElementById("nameInput");
const descriptionInput = document.getElementById("descriptionInput");
const priceInput = document.getElementById("priceInput");
const categorySelect = document.getElementById("categorySelect");
const addEditContainer = document.getElementById("addEdit");
const addEditParent = addEditContainer.parentNode;
const cancelAddEdit = document.getElementById("addEditCancel");

const addEditAds = (edit, categoryId) => {
  previewImageFunc();
  document.getElementById("error").innerHTML = "";

  cancelAddEdit.onclick = () => {
    addEditParent.classList.remove("visible");
    addEditContainer.setAttribute("hidden", "hidden");
    document.querySelector("body").classList.remove("addEditVisible");
  };

  addEditParent.classList.add("visible");

  document.querySelector("body").classList.add("addEditVisible");

  const button = document.getElementById("addEditSubmit");
  const addEditForm = document.getElementById("addEditForm");

  addEditContainer.removeAttribute("hidden");

  button.innerHTML = edit ? "Update" : "Add";

  imgInput.value = edit ? dataAds.find((el) => el.id == edit).image : "";
  previewImage.src = edit
    ? imgInput.value
    : "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";
  nameInput.value = edit ? dataAds.find((el) => el.id == edit).title : "";
  descriptionInput.value = edit
    ? dataAds.find((el) => el.id == edit).description
    : "";
  priceInput.value = edit ? dataAds.find((el) => el.id == edit).price : "";

  categorySelect.innerHTML = "";

  for (let el of dataCategories) {
    const option = document.createElement("option");
    option.innerHTML = el.name;
    option.value = el.id;
    categorySelect.appendChild(option);
  }

  categorySelect.value = categoryId
    ? dataCategories.find((el) => el.id == categoryId).id
    : dataCategories[0].id;

  addEditForm.onsubmit = (e) => {
    e.preventDefault();
    addEditSubmit(edit);
  };
};

const addEditSubmit = async (edit) => {
  if (
    imgInput.value == "" ||
    nameInput.value == "" ||
    descriptionInput.value == "" ||
    priceInput.value == ""
  ) {
    document.getElementById("error").innerHTML = "Please fill every input";
    return;
  }

  if (edit) {
    await fetch(`http://localhost:3000/ads/${edit}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        image: imgInput.value,
        categoryId: categorySelect.value,
      }),
    });
  } else {
    await fetch(`http://localhost:3000/ads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: nameInput.value,
        description: descriptionInput.value,
        price: priceInput.value,
        image: imgInput.value,
        categoryId: categorySelect.value,
        userId: userId,
        likes: [],
        views: 0,
        rating: [],
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
    container.remove();
    await fetch(`http://localhost:3000/ads/${elementId}`, {
      method: "DELETE",
    });

    deleteContainer.style.display = "none";
  };
};
