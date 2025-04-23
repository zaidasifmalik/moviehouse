export async function getMovies() {
  const data = await import("../movies.json");
  return data.movies;
}

export async function getGenres() {
  const data = await import("../movies.json");
  return data.genres;
}

export async function getDirectors() {
  const data = await import("../movies.json");
  return data.directors;
}

export async function getMovieById(id) {
  const movies = await getMovies();
  return movies.find((movie) => movie.id === id) || null;
}

export async function getGenreById(id) {
  const genres = await getGenres();
  return genres.find((genre) => genre.id === id) || null;
}

export async function getDirectorById(id) {
  const directors = await getDirectors();
  return directors.find((director) => director.id === id) || null;
}

export async function getMoviesByGenre(genreId) {
  const movies = await getMovies();
  return movies.filter((movie) => movie.genreId === genreId);
}

export async function getMoviesByDirector(directorId) {
  const movies = await getMovies();
  return movies.filter((movie) => movie.directorId === directorId);
}

export async function getTrendingMovies() {
  const movies = await getMovies();
  return movies.filter((movie) => movie.rating >= 8.5);
}
