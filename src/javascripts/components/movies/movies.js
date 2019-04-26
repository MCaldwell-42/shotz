import locations from '../locations/locations';
import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';


let movies = [];

const domStringBuilder = () => {
  let domString = '';
  domString += '<div class = "container">';
  domString += '<div class = "d-flex row">';
  movies.forEach((movie) => {
    domString += `<div id = ${movie.id} class="card movie col-3">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${movie.name}</h5>`;
    domString += `<p>${movie.genre}</p>`;
    domString += `<p>${movie.releaseDate}</p>`;
    domString += `<p>${movie.description}</p>`;
    domString += `<p>${movie.locations.length} Locations</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '  <div id="back">';
  domString += '  </div>';
  domString += '</div>';
  domString += '</div>';
  util.printToDom('movies', domString);
};

const filteredMovies = (movieId) => {
  const clickedMovie = movies.filter(x => x.id === movieId);
  domStringBuilder(clickedMovie);
  locations.movieLocations(clickedMovie[0].locations);
  locations.hideFilters();
  let domString = '';
  domString += '<div class="col-12 col-sm-6 col-md-4 col-lg-3">';
  domString += '  <button id="backButton">All Movies</button>';
  domString += '</div>';
  document.getElementById('back').innerHTML += domString;
  document.getElementById('backButton').addEventListener('click', () => {
    domStringBuilder(movies);
    const domMovies = Array.from(document.getElementsByClassName('movie'));
    domMovies.forEach((movie) => {
      movie.addEventListener('click', () => {
        filteredMovies(movie.id);
      });
    });
    locations.showFilters();
    locations.initializeLocations();
  });
};


const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const moviesResults = resp.data.movies;
      movies = moviesResults;
      domStringBuilder();
      const movieCards = Array.from(document.getElementsByClassName('movie'));
      movieCards.forEach((card) => {
        card.addEventListener('click', () => {
          filteredMovies(card.id);
        });
      });
    })
    .catch(err => console.error(err));
};


export default { initializeMovies };
