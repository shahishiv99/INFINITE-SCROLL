const imgContainer = document.getElementById("imgContainer");
const loader = document.getElementById("loader");

let image = [];
let ready = false;
let loadImages = 0;
let totalImage = 0;
const apiKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
// "aHv2UiKnE8p0l0K7XF-zpHPgjzppVpQSau1iCqAgMWA";
const count = 15;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function loadImg() {
  loadImages++;
  if (loadImages === totalImage) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  loadImages = 0;
  totalImage = image.length;
  image.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", loadImg);

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
}

async function photos() {
  try {
    const response = await fetch(apiUrl);
    image = await response.json();
    displayPhotos();
  } catch (error) {
    console.log("error", error);
  }
}

window.addEventListener("scroll", () => {
  if (
    // document.body.scrollTop > 50 ||
    // document.documentElement.scrollTop > 50
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    photos();
  } else {
  }
});

photos();
