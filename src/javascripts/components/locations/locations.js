import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';


let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-warning';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilder = (locArray) => {
  let domString = '';
  // domString += '<div class = "container">';
  domString += '<div class = "d-flex row">';
  locArray.forEach((location) => {
    domString += `<div id = ${location.id} class="card location col-2">`;
    domString += '<div class="card-body">';
    domString += `<h5 class="card-header ${shootTimeClass(location.shootTime)}">${location.name}</h5>`;
    domString += `<img class="img-thumbnail" src=${location.imageUrl}></img>`; // thumbnail controls size
    domString += `<p>${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  // domString += '</div>';
  util.printToDom('locations', domString);
};

const filterButtonEvent = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  switch (buttonId) {
    case 'afterDark':
      domStringBuilder(darkLocations);
      break;
    case 'morning':
      domStringBuilder(morningLocations);
      break;
    case 'afternoon':
      domStringBuilder(afternoonLocations);
      break;
    case 'evening':
      domStringBuilder(eveningLocations);
      break;
    default:
      domStringBuilder(locations);
  }
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationsResults = resp.data.locations;
      locations = locationsResults;
      domStringBuilder(locations);
      document.getElementById('afterDark').addEventListener('click', filterButtonEvent);
      document.getElementById('morning').addEventListener('click', filterButtonEvent);
      document.getElementById('afternoon').addEventListener('click', filterButtonEvent);
      document.getElementById('evening').addEventListener('click', filterButtonEvent);
      document.getElementById('all').addEventListener('click', filterButtonEvent);
    })
    .catch(err => console.error(err));
};

// function checkDark(shootTime) {
//   return shootTime === 'After Dark';
// }


const afterDark = () => {
  let Dark = [];
  Dark = locations.filter(location => location.shootTime === 'After Dark');
  domStringBuilder(Dark);
};

export default { initializeLocations, afterDark, filterButtonEvent };
