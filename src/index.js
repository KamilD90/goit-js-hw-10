import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { debounce } from 'lodash';
const DEBOUNCE_DELAY = 300;

const countryInput = document.getElementById('search__box');
const countryList = document.querySelector('.country__list');
const countryInfo = document.querySelector('.country__info');

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
  countryInfo.innerHTML = '';
  const similarCountries = countries
    .map(({ name, flags }) => {
      return `<li class= list__item>
      <img class="flag" src="${flags.png}" alt="${name.official} flag"/>
      <h3 class="country__names">${name.official}</h3>
        </li>`;
    })
    .join('');
  countryList.innerHTML = similarCountries;
}

function renderCountryInfo(countries) {
  countryList.innerHTML = '';
  const fullCountryInfo = ({ name, capital, population, flags, languages }) => {
    const languageNames = Object.values(languages).join(', ');
    return `
    <div class= "flag-country">
    <img class="flag" src="${flags.png}" alt="${name.official} flag"/>
      <h1>${name.official}</h1>  
    </div>
    <h3 class="minor__properities"><b> Capital:</b> ${capital}</h3> 
    <h3 class="minor__properities"><b> Population: </b> ${population}</h3>
    <h3 class="minor__properities"><b> Languages: </b> ${languageNames}</h3>
    `;
  };

  countryInfo.innerHTML = fullCountryInfo(countries);
}
