const input = document.querySelector(".input");
const dropBtn = document.querySelector("#drop-btn");
const popular = getPopular();
const list = document.querySelector(".columns");
const moviesTemplate = document.querySelector("[moviesTemplate]").innerHTML;

async function getPopular() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=7278636ea221a54a9f8fe03a2b4a4eb7"
  );
  const data = await response.json();
  const movies = data.results;

  render(movies);

  function render(movies, str = "") {
    const reg = RegExp(str, "gi");
    list.innerHTML = movies
      .filter(
        ({ title, backdrop_path, overview, release_date, genre_ids }) =>
          title.match(reg) ||
          backdrop_path.match(reg) ||
          overview.match(reg) ||
          release_date.match(reg)
      )
      .map((movie) =>
        moviesTemplate
          .replaceAll("%title%", movie.title)
          .replaceAll("%path%", movie.backdrop_path)
          .replaceAll("%overview", movie.overview)
          .replaceAll("%release%", movie.release_date)
          .replaceAll("%average%", movie.vote_average)
          .replaceAll("%genre%", movie.genre_ids)
      )
      .join("");
  }
  input.oninput = (e) => {
    const term = e.target.value;
    console.log(term);
    if (term.length >= 3) {
      render(movies, term);
    } else {
      render(movies);
    }
  };
}

async function getGenres() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=7278636ea221a54a9f8fe03a2b4a4eb7"
  );
  const data = await response.json();
  const genres = data.results;
}
