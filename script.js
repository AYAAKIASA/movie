async function displayMovies(movies) {
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.addEventListener('click', () => {
      alert(`Movie ID: ${movie.id}`);
    });

    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const title = movie.title;
    const overview = movie.overview.substring(0, 150) + '...';
    const rating = movie.vote_average;

    const poster = document.createElement('img');
    poster.src = posterUrl;
    poster.alt = title;

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `
      <h2>${title}</h2>
      <p>Rating: ${rating}</p>
      <p>${overview}</p>
    `;

    movieCard.appendChild(poster);
    movieCard.appendChild(info);

    movieList.appendChild(movieCard);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = '130d7c4426a3008f6995c59c280aebd5';
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results);

  document.getElementById('searchInput').focus();
});

document.getElementById('searchButton').addEventListener('click', searchMovies);

document.getElementById('searchInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchMovies();
  }
});

async function searchMovies() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  if (searchTerm) {
    const apiKey = '130d7c4426a3008f6995c59c280aebd5';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    const response = await fetch(url);
    const data = await response.json();
    
    const filteredMovies = data.results.filter(movie => {
      return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    displayMovies(filteredMovies);
    document.getElementById('returnButton').style.display = 'block';
  }
}

document.getElementById('returnButton').addEventListener('click', () => {
  window.location.reload();
});
