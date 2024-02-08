let userId;
let dataAds;
let dataCategories;
let dataUser;

const writeData = async () => {
  userId = JSON.parse(localStorage.getItem("user")).id;

  const responseUser = await fetch(`http://localhost:3000/users`);
  dataUser = await responseUser.json();

  const responseAds = await fetch(`http://localhost:3000/ads`);
  dataAds = await responseAds.json();

  const responseCategories = await fetch(`http://localhost:3000/categories`);
  dataCategories = await responseCategories.json();

  showCategories(dataCategories);

  writeAds(dataAds);
};

writeData();

const showCategories = (categories) => {
  const selectCategory = document.getElementById("filterSelect");
  for (el of categories) {
    const option = document.createElement("option");
    option.innerHTML = el.name;
    option.value = el.id;
    selectCategory.appendChild(option);
  }
};

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

    const nameDiv = document.createElement("div");
    asidePart.appendChild(nameDiv);
    nameDiv.innerHTML =
      dataUser.find((user) => user.id == el.userId).firstName +
      " " +
      dataUser.find((user) => user.id == el.userId).lastName;

    const adName = document.createElement("div");
    asidePart.appendChild(adName);
    adName.innerHTML = el.title;

    const categoryName = document.createElement("div");
    asidePart.appendChild(categoryName);
    categoryName.innerHTML =
      "Category: " +
      dataCategories.find((category) => category.id == el.categoryId).name;

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

    const viewButton = document.createElement("button");
    buttonContainer.appendChild(viewButton);
    viewButton.innerHTML = "View";

    viewButton.onclick = async () => {
      await fetch(`http://localhost:3000/ads/${el.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          views: Number(el.views) + 1,
        }),
      });
      window.open(`../AdInfo/ad_info.html?id=${el.id}`, "_self");
    };
  }
};

const filter = () => {
  const categoryId = document.getElementById("filterSelect").value;

  let filteredAds = dataAds;
  if (categoryId != "all") {
    filteredAds = dataAds.filter((ad) => ad.categoryId == categoryId);
  }

  const minInput = document.getElementById("inputMin").value;
  if (minInput != "" && isNaN(minInput) == false) {
    const min = Number(minInput);
    filteredAds = filteredAds.filter((ad) => ad.price > min);
  }
  const maxInput = document.getElementById("inputMax").value;
  if (maxInput != "" && isNaN(maxInput) == false) {
    const max = Number(maxInput);
    filteredAds = filteredAds.filter((ad) => ad.price < max);
  }

  const sortBy = document.getElementById("sortBy").value;
  const sortOrder = document.getElementById("sortOrder").value;
  if (sortBy == "price" && sortOrder == "asc") {
    filteredAds = filteredAds.sort((a, b) => a.price - b.price);
  }
  if (sortBy == "price" && sortOrder == "desc") {
    filteredAds = filteredAds.sort((a, b) => b.price - a.price);
  }
  if (sortBy == "likes" && sortOrder == "asc") {
    filteredAds = filteredAds.sort((a, b) => a.likes.length - b.likes.length);
  }
  if (sortBy == "likes" && sortOrder == "desc") {
    filteredAds = filteredAds.sort((a, b) => b.likes.length - a.likes.length);
  }
  if (sortBy == "views" && sortOrder == "asc") {
    filteredAds = filteredAds.sort((a, b) => a.views - b.views);
  }
  if (sortBy == "views" && sortOrder == "desc") {
    filteredAds = filteredAds.sort((a, b) => b.views - a.views);
  }

  const ratingFunc = (el) => {
    if (el.rating.length == 0) {
      return 0;
    }
    let rating = 0;
    for (rat of el.rating) {
      rating += rat.stars;
    }
    return rating / el.rating.length;
  };

  if (sortBy == "rating" && sortOrder == "asc") {
    filteredAds = filteredAds.sort((a, b) => ratingFunc(a) - ratingFunc(b));
  }
  if (sortBy == "rating" && sortOrder == "desc") {
    filteredAds = filteredAds.sort((a, b) => ratingFunc(b) - ratingFunc(a));
  }

  writeAds(filteredAds);
};

const accordionToggle = document.getElementById("accordion-toggle");

accordionToggle.addEventListener("click", function () {
  const accBody = accordionToggle.parentElement;
  const accEl = document.querySelectorAll(".accordion");

  if (accBody.style.maxHeight) {
    accBody.style.maxHeight = null;
    for (el of accEl) {
      el.style.display = "none";
    }
  } else {
    for (el of accEl) {
      el.style.display = "grid";
    }
    accBody.style.maxHeight = "max-content";
    accBody.style.overflow = "hidden";
  }
});
