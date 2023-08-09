const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmM3ZTgxZDJmYTFlMDdjYjQ2ODEyNTEyMmZhZjBkNyIsInN1YiI6IjYyNDY4OGU0MmUyYjJjMDA2Mjk4OWYxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YdrXM4MoSWtrT5rfQAjBktoYpjg8dzAGl_0H3NSlUC8";
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "pt-BR";
const params = `?include_adult=false&language=${LANGUAGE}&sort_by=popularity.desc`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
};

export async function getMovieListByPage(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie${params}&page=${page}`,
      options
    );

    console.log(window.globalPageIndex);

    return response.json();
  } catch (e) {
    console.error("error", e);
  }
}
