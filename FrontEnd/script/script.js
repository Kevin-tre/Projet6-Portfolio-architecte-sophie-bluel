const token = localStorage.getItem("token");
let works = [];
let categories = [];
const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
};

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const modalContainer = document.querySelector(".modal-container");

const closeModal = () => {
  modalContainer.innerHTML = "";
};

const generateFirstModalContent = () => {
  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";
  const title = document.createElement("h2");
  title.innerHTML = "Gallerie Photo";
  const worksContainer = document.createElement("div");
  worksContainer.className = "works-container";
  for (let i = 0; i < works.length; i++) {
    const imgIcon = document.createElement("div"); // Div pour stocker l'image et l'icone
    imgIcon.className = "imgIcon";

    const imgWork = document.createElement("img");
    imgWork.className = "works-img";
    imgWork.src = works[i].imageUrl;

    const trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash-can trash-icon";
    trashIcon.addEventListener("click", () => deleteWorks(works[i].id));

    imgIcon.appendChild(imgWork);
    imgIcon.appendChild(trashIcon);
    worksContainer.appendChild(imgIcon);
  }
  const line = document.createElement("span");
  line.className = "line";
  const button = document.createElement("button");
  button.innerHTML = "Ajouter une photo";
  button.className = "add-picture-button";
  button.addEventListener("click", generateSecondModalContent);
  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark close-icon";
  closeIcon.addEventListener("click", closeModal);
  modalContent.appendChild(title);
  modalContent.appendChild(worksContainer);
  modalContent.appendChild(line);
  modalContent.appendChild(button);
  modalContent.appendChild(closeIcon);
};

const addWork = async () => {
  const image = document.querySelector(".input-image").files[0];
  const title = document.querySelector(".input-title").value;
  const category = document.querySelector(".category-select").value;
  if (!image || !title || !category) {
    return alert("Veuillez remplir tous les champs");
  }
  var formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);
  const response = await fetch(`http://localhost:5678/api/works/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (response.ok) {
    await getWorks();
    generateSecondModalContent();
  } else {
    alert("Erreur dans l'ajout");
  }
};

const generateSecondModalContent = () => {
  const modalContent = document.querySelector(".modal-content");
  modalContent.innerHTML = "";
  const title = document.createElement("h2");
  title.innerHTML = "Ajout photo";
  const returnIcon = document.createElement("i");
  returnIcon.className = "fa-solid fa-arrow-left return-icon";
  returnIcon.addEventListener("click", generateFirstModalContent);
  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark close-icon";
  closeIcon.addEventListener("click", closeModal);
  const formContainer = document.createElement("div");
  formContainer.className = "add-form-container";
  const inputImage = document.createElement("input");
  inputImage.type = "file";
  inputImage.className = "input-image";
  inputImage.id = "input-image";
  inputImage.addEventListener("change", () => {
    if (inputImage.files[0]) {
      if (
        inputImage.files[0].type !== "image/png" &&
        inputImage.files[0].type !== "image/jpg" &&
        inputImage.files[0].type !== "image/jpeg"
      ) {
        return alert("Veuillez sélectionner un fichier au format image");
      } else if (inputImage.files[0].size > 4000000) {
        return alert("Votre image est supérieur à 4mo");
      } else {
        console.log(inputImage.files[0]);

        const addImage = document.createElement("img");
        addImage.className = "add-image";
        addImage.src = URL.createObjectURL(inputImage.files[0]);
        label.innerHTML = "";
        label.appendChild(addImage);

        if (inputTitle.value) {
          button.className = "add-picture-button";
        }
      }
    }
  });

  const label = document.createElement("label");
  label.htmlFor = "input-image";
  label.className = "label-add-picture";
  const pictureButton = document.createElement("div");
  pictureButton.className = "add-picture-container";
  const addPicture = document.createElement("div");
  const pictureCard = document.createElement("i");
  pictureCard.className = "fa-regular fa-image picture-card";
  addPicture.className = "add-picture";
  addPicture.innerHTML = "+ Ajouter photo";
  const sizeDescription = document.createElement("p");
  sizeDescription.innerHTML = "jpg, png : 4mo max";
  const inputTitle = document.createElement("input");
  inputTitle.className = "input-title";
  inputTitle.addEventListener("change", () => {
    if (inputImage.files[0] && inputTitle.value) {
      //changer classe button
      button.className = "add-picture-button";
    }
  });
  const categorySelect = document.createElement("select");
  categorySelect.className = "category-select";
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.value = categories[i].id;
    option.innerHTML = categories[i].name;
    categorySelect.appendChild(option);
  }
  const button = document.createElement("button");
  button.innerHTML = "Valider";
  button.className = "add-picture-button-disable";
  button.addEventListener("click", addWork);
  modalContent.appendChild(title);
  formContainer.appendChild(inputImage);
  pictureButton.appendChild(pictureCard);
  pictureButton.appendChild(addPicture);
  pictureButton.appendChild(sizeDescription);
  label.appendChild(pictureButton);
  formContainer.appendChild(label);
  formContainer.appendChild(inputTitle);
  formContainer.appendChild(categorySelect);
  modalContent.appendChild(formContainer);
  modalContent.appendChild(button);
  modalContent.appendChild(returnIcon);
  modalContent.appendChild(closeIcon);
};

const generateModal = () => {
  const modal = document.createElement("div");
  modal.className = "modal";
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modal.appendChild(modalContent);
  modalContainer.appendChild(modal);
  generateFirstModalContent();
};

const generateLogoutButton = () => {
  const authButton = document.querySelector(".auth-button");
  authButton.innerHTML = "";
  const logoutButton = document.createElement("a");
  logoutButton.innerHTML = "Logout";
  logoutButton.addEventListener("click", logoutUser);
  authButton.appendChild(logoutButton);
};

const generateTopBar = () => {
  const topBarContainer = document.querySelector(".top-bar-container");
  const topBar = document.createElement("div");
  topBar.className = "top-bar";
  const icon = document.createElement("i");
  icon.className = "fa-regular fa-pen-to-square edit-icon";
  const span = document.createElement("span");
  span.innerHTML = "Mode édition";
  topBar.appendChild(icon);
  topBar.appendChild(span);
  topBarContainer.appendChild(topBar);
};

const generateEditButton = () => {
  const projectTitle = document.querySelector(".project-title");
  const editButton = document.createElement("div");
  editButton.addEventListener("click", generateModal);
  const icon = document.createElement("i");
  icon.className = "fa-regular fa-pen-to-square edit-icon";
  const span = document.createElement("span");
  span.innerHTML = "modifier";
  editButton.appendChild(icon);
  editButton.appendChild(span);
  projectTitle.appendChild(editButton);
};

const deleteWorks = async (id) => {
  console.log(`Bearer ${token}`);
  const response = await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    await getWorks();
    generateFirstModalContent();
  } else {
    alert("Erreur dans la supression");
  }
};

if (token) {
  generateLogoutButton();
  generateEditButton();
  generateTopBar();
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
const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      works = data;
      displayWorks(0);
    });
};

const displayWorks = (categoryId) => {
  // console.log(categoryId);
  let fileredWorks = [];
  if (categoryId === 0) {
    fileredWorks = works;
  } else {
    fileredWorks = works.filter((work) => work.categoryId === categoryId);
  }
  const filter_button = document.getElementsByClassName("flt_btn");
  // console.log(filter_button[1]);
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
