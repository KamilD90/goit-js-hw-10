import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { debounce } from 'lodash';
const DEBOUNCE_DELAY = 300;

const countryInput = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleInput() {
  //metoda trim() ucina niepotrzebne spacje na początku i końcu
  const searchTerm = countryInput.value.trim();
  console.log('search term', searchTerm);

  if (searchTerm) {
    fetchCountries(searchTerm)
      .then(countries => {
        // console.log(countries);
        if (countries.length === 1) {
          renderCountryInfo(countries[0]);
        } else if (countries.length > 1 && countries.length <= 10) {
          renderCountryList(countries);
        } else if (countries.length > 10) {
          Notiflix.Notify.info(
            'too many matches found. Please enter a more specific name.'
          );
        } else {
          Notiflix.Notify.failure(' OOops, there is no country with that name');
        }
      })
      .catch(error => Notiflix.Notify.failure('something went wrong, sorry'));
  } else {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  }
}

const debouncedHandleInput = debounce(handleInput, DEBOUNCE_DELAY);

// dodanie event listenera na zwykla metodę bez ograniczen wywolywania
// countryInput.addEventListener('input', handleInput);

// dodanie event listenera na metode z ograniczeniem wywolywania na DEBOUNCE_DELAY
countryInput.addEventListener('input', debouncedHandleInput);

function renderCountryList(countries) {
  const similarCountries = countries
    .map(({ name, flags }) => {
      return `<li>
          <h3 class="country_name">${name.official}</h3>
          <img class="country_flag" src="${flags.png}" alt="${name.official} flag"/>
        </li>`;
    })
    .join('');
  countryList.innerHTML = similarCountries;
}

function renderCountryInfo(countries) {
  const fullCountryInfo = countries
    .map(({ name, capital, population, flags, languages }) => {
      return `
    <img class="country_flag" src="${flags.png}" alt="${name.official} flag"/>
    <h1><span class="country_name">Country name:</span> ${name.official}<h1> 
    <h3><b> Capital:</b> ${capital}</h3> 
    <h3><b> Population: </b> ${population}</h3>
    <h3><b> Languages: </b> ${languages}</h3>
    `;
    })
    .join('');
  countryInfo.innerHTML = fullCountryInfo;
}
