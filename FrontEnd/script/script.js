let works = [];
let categories = [];

const gallery = document.querySelector(".gallery")
const filters = document.querySelector('.filters')
const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      categories = data;
      displayCategories();
    });
};
const getWorks = () => {
  fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      works = data;
      displayWorks();
    });
};

const displayWorks = () => {
    for (let i =0 ; i<works.length ; i++) {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        img.src= works[i].imageUrl
        img.alt=works[i].title
        const figcaption = document.createElement("figcaption")
        figcaption.innerHTML =works[i].title
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
}

const displayCategories = () => {
    let categoriesList = [...categories]
    categoriesList.push({
        "id": 0,
        "name": "Tous"
    })
   categoriesList.sort((a,b) => a.id - b.id); // b - a for reverse sort.sort((a,b) => a.last_nom - b.last_nom); // b - a for reverse sort
    for (let i =0 ; i<categoriesList.length ; i++) {
        console.log(categoriesList[i]);
        const button = document.createElement("button")
        button.innerHTML = categoriesList[i].name
        button.className= "filter_button"
        filters.appendChild(button)
    }
}
getCategories();
getWorks();