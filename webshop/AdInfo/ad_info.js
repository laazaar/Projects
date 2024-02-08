let adId;
let userId;
let dataAd;
let dataCategories;
let dataUser;

const writeData = async () => {
  adId = window.location.search.split("=")[1];
  userId = JSON.parse(localStorage.getItem("user")).id;

  const responseUser = await fetch(`http://localhost:3000/users`);
  dataUser = await responseUser.json();

  const responseAd = await fetch(`http://localhost:3000/ads/${adId}`);
  dataAd = await responseAd.json();

  const responseCategories = await fetch(`http://localhost:3000/categories`);
  dataCategories = await responseCategories.json();

  writeAd(dataAd);
  writeComments();
};

writeData();

const writeComments = async () => {
  const responseComments = await fetch(
    `http://localhost:3000/comments?adId=${adId}`
  );
  dataComments = await responseComments.json();

  const numOfComments = document.getElementById("numOfComments");
  numOfComments.innerHTML = "Comments: " + dataComments.length;

  const commentsContainer = document.getElementById("comments");

  commentsContainer.innerHTML = "";

  for (el of dataComments) {
    const comment = document.createElement("div");
    commentsContainer.appendChild(comment);

    const commentUser = document.createElement("div");
    comment.appendChild(commentUser);
    commentUser.className = "commentUser";

    const commentUserPicture = document.createElement("img");
    commentUser.appendChild(commentUserPicture);
    commentUserPicture.src = dataUser.find(
      (user) => user.id == el.userId
    ).profileImage;

    const commentUserName = document.createElement("div");
    commentUser.appendChild(commentUserName);
    commentUserName.innerHTML =
      dataUser.find((user) => user.id == el.userId).firstName +
      " " +
      dataUser.find((user) => user.id == el.userId).lastName;

    const commentText = document.createElement("div");
    comment.appendChild(commentText);
    commentText.innerHTML = el.text;
  }
};

const writeAd = (data) => {
  const adsContainer = document.getElementById("allAds");

  adsContainer.innerHTML = "";

  const container = document.createElement("div");
  adsContainer.appendChild(container);

  const imgDiv = document.createElement("div");
  container.appendChild(imgDiv);
  const img = document.createElement("img");
  imgDiv.appendChild(img);
  img.src = data.image;
  imgDiv.classList.add("img-div");

  const topContainer = document.createElement("div");
  container.appendChild(topContainer);
  topContainer.classList.add("top-container");

  const likeButton = document.createElement("i");
  topContainer.appendChild(likeButton);
  likeButton.className = "fa-regular fa-heart like-button ";
  likeButtonFunc(likeButton, data);

  const ratingStars = document.createElement("div");
  topContainer.appendChild(ratingStars);

  ratingStarsFunc(ratingStars, data);

  const asidePart = document.createElement("div");
  container.appendChild(asidePart);
  asidePart.classList.add("aside-part");

  const adName = document.createElement("div");
  asidePart.appendChild(adName);
  adName.innerHTML = data.title;
  adName.classList.add("ad-name");

  const nameDiv = document.createElement("div");
  asidePart.appendChild(nameDiv);
  nameDiv.classList.add("name-div");
  nameDiv.innerHTML =
    dataUser.find((user) => user.id == data.userId).firstName +
    " " +
    dataUser.find((user) => user.id == data.userId).lastName;

  const categoryName = document.createElement("div");
  asidePart.appendChild(categoryName);
  categoryName.innerHTML =
    "Category: " +
    dataCategories.find((category) => category.id == data.categoryId).name;
  categoryName.classList.add("category-name");

  const adDesc = document.createElement("div");
  asidePart.appendChild(adDesc);
  adDesc.innerHTML = data.description;
  adDesc.classList.add("description");

  const smallContainer = document.createElement("div");
  asidePart.appendChild(smallContainer);
  smallContainer.classList.add("small-container");

  const likes = document.createElement("div");
  smallContainer.appendChild(likes);
  likes.innerHTML = `<i class="fa-solid fa-heart"></i> ${data.likes.length}`;

  const views = document.createElement("div");
  smallContainer.appendChild(views);
  views.innerHTML = `<i class="fa-solid fa-eye"></i> ${data.views}`;

  let ratingInfo = 0;
  for (let rating of data.rating) {
    ratingInfo += rating.stars;
  }
  const rating = document.createElement("div");
  smallContainer.appendChild(rating);
  rating.innerHTML = `<i class="fa-solid fa-star"></i> ${
    data.rating.length != 0 ? (ratingInfo / data.rating.length).toFixed(1) : 0
  }`;

  const price = document.createElement("div");
  asidePart.appendChild(price);
  price.innerHTML = `Price: $${data.price.toLocaleString()}`;
  price.classList.add("price");

  if (dataUser.find((user) => user.id == userId).admin) {
    const deleteButton = document.createElement("button");
    topContainer.appendChild(deleteButton);
    deleteButton.innerHTML = "Delete";

    const deleteContainer = document.getElementById("deleteContainer");
    deleteButton.onclick = () => {
      deleteContainer.style.display = "grid";
      deleteFunc(data.id);
    };
  }
};

const likeButtonFunc = (likeButton, data) => {
  let userLike = data.likes.find((el) => el == userId);
  if (userLike) {
    likeButton.style.color = "red";
    likeButton.classList.remove("fa-regular");
    likeButton.classList.add("fa-solid");
  }

  likeButton.onclick = async () => {
    let newLikes = data.likes;
    if (userLike) {
      newLikes = data.likes.filter((el) => el != userLike);
    } else {
      newLikes.push(userId);
    }

    await fetch(`http://localhost:3000/ads/${adId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    });

    writeData();
  };
};

const ratingStarsFunc = (ratingStars, data) => {
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("i");
    ratingStars.appendChild(star);
    star.className = "fa-regular fa-star";

    star.onclick = async () => {
      const newRating = data.rating.filter((el) => el.userId != userId);
      newRating.push({ stars: i, userId: userId });

      await fetch(`http://localhost:3000/ads/${adId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: newRating,
        }),
      });

      writeData();
    };
  }

  const userRating = Number(
    data.rating.find((el) => el.userId == userId)?.stars
  );

  if (userRating) {
    const allStars = ratingStars.querySelectorAll(".fa-star");
    for (let i = 0; i < userRating; i++) {
      allStars[i].classList.remove("fa-regular");
      allStars[i].classList.add("fa-solid");
      allStars[i].style.color = "gold";
    }
  }
};

const addNewComment = async () => {
  const comment = document.getElementById("addComment");

  await fetch(`http://localhost:3000/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      adId: adId,
      text: comment.value,
    }),
  });

  comment.value = "";

  writeComments();
};

const deleteFunc = (elementId) => {
  document.getElementById("deleteCancel").onclick = () =>
    (deleteContainer.style.display = "none");

  document.getElementById("deleteYes").onclick = async () => {
    await fetch(`http://localhost:3000/ads/${elementId}`, {
      method: "DELETE",
    });
    await fetch(`http://localhost:3000/comments?adId=${elementId}`, {
      method: "DELETE",
    });
    window.open("../Ads/ads.html", "_self");

    deleteContainer.style.display = "none";
  };
};
