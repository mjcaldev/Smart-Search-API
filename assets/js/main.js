//Using below data for now. I plan to revise data and functionality via Ames Housing dataset
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []; 

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data))

function findMatches(wordMatch, cities) {
  return cities.filter(location => {

    const regex = new RegExp(wordMatch, 'gi'); // regex: global and case-insensitive
    return location.city.match(regex) || location.state.match(regex);
  })
}

function numWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(location => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = location.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = location.state.replace(regex, `<span class="hl">${this.value}</span>`)

    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="pop">${numWithCommas(location.population)}
    </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
