import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';


let movies = [];

const domStringBuilder = () => {
  let domString = '';
    // eslint-disable-next-line no-unused-expressions
  domString += '<div class = "container">';
  domString += '<div class = "d-flex row">';
  movies.forEach((movie) => {
    domString += `<div id = ${movie.id} class="card movie col-3">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-title">${movie.name}</h5>`;
    domString += `<p>${movie.genre}</p>`
    domString += `<p>${movie.releaseDate}</p>`;
    domString += `<p>${movie.description}</p>`;
    domString += `<p>${movie.locations.length} Locations</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const moviesResults = resp.data.movies;
      movies = moviesResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };
