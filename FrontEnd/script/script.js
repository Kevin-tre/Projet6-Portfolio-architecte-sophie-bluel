const token = localStorage.getItem("token");
let works = [];
let categories = [];
const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
};

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

if (token) {
  const authButton = document.querySelector(".auth-button");
  authButton.innerHTML = "";
  const logoutButton = document.createElement("a");
  logoutButton.innerHTML = "Logout";
  logoutButton.addEventListener("click", logoutUser);
  authButton.appendChild(logoutButton);
}
const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      categories = data;
      if (!token) {
        displayCategories();
      }
    });
};
const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      works = data;
      displayWorks(0);
    });
};

const displayWorks = (categoryId) => {
  console.log(categoryId);
  let fileredWorks = [];
  if (categoryId === 0) {
    fileredWorks = works;
  } else {
    fileredWorks = works.filter((work) => work.categoryId === categoryId);
  }
  const filter_button = document.getElementsByClassName("flt_btn");
  console.log(filter_button[1]);
  for (let i = 0; i < filter_button.length; i++) {
    if (i === categoryId) {
      filter_button[i].className = "filter_button_active flt_btn";
    } else {
      filter_button[i].className = "filter_button flt_btn";
    }
  }
  gallery.innerHTML = "";
  for (let i = 0; i < fileredWorks.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = fileredWorks[i].imageUrl;
    img.alt = fileredWorks[i].title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = fileredWorks[i].title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
};

const displayCategories = () => {
  let categoriesList = [...categories];
  categoriesList.push({
    id: 0,
    name: "Tous",
  });
  categoriesList.sort((a, b) => a.id - b.id); // b - a for reverse sort.sort((a,b) => a.last_nom - b.last_nom); // b - a for reverse sort
  for (let i = 0; i < categoriesList.length; i++) {
    const button = document.createElement("button");
    button.innerHTML = categoriesList[i].name;
    button.className = "filter_button flt_btn";
    button.addEventListener("click", () => displayWorks(categoriesList[i].id));
    filters.appendChild(button);
  }
};

getCategories();
getWorks();
