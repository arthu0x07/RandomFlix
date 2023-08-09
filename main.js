import { getMovieListByPage } from "./services/api/movies.js";

const buttonElement = document.querySelector(".element-searchMovie-button");
buttonElement.addEventListener("click", handleSearchMovie);

const movieList = [{}];
let listMovieIndex = 0;
window.globalPageIndex = 1;

function handleSearchMovie() {
  const { title, overview, poster_path } =
    movieList[window.globalPageIndex][listMovieIndex];

  renderMovieCard(title, overview, poster_path);
  managerPageAndIndex();
}

function managerPageAndIndex() {
  if (listMovieIndex < 19) {
    listMovieIndex++;
  }

  if (listMovieIndex === 19) {
    window.globalPageIndex++;
    listMovieIndex = 0;
  }

  if (listMovieIndex === 15) {
    setMovieList(1 + window.globalPageIndex);
  }
}

function renderMovieCard(title, overview, imageID) {
  const titleElement = document.querySelector(".element-movieTitle");
  const overviewElement = document.querySelector(".element-movieOverview");
  const imageElement = document.querySelector(".cardMovie-image");

  titleElement.innerText = title;
  overviewElement.innerText = overview;
  imageElement.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${imageID}`
  );
}

async function setMovieList(page) {
  let movieListResponse = await getMovieListByPage(page);
  movieList.push(movieListResponse.results);

  return true;
}

async function initialLoading() {
  buttonElement.setAttribute("disabled", "true");
  const validation = setMovieList();

  if (validation) {
    buttonElement.removeAttribute("disabled");
  }
}

initialLoading();

// Preciso salvar no LocalStorage a página e o listMovieIndex do ultimo filme visto.
// Criar função para buscar no localStorage, buscar a página informada e renderizar o p´roximo item.