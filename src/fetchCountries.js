import Notiflix from 'notiflix';
export const fetchCountries = name => {
  return fetch(`https://restcountries.com/v3.1/name/{name}`)
    .then(response => {
      if (!response.ok) {
        throw Notiflix.Notify.failure('Network response was not ok');
      }
      return response.json();
    })
    .than(data => {
      return data;
    })

    .catch(error => {
      console.error('There was problem with the fetch operation: ', error);
    });
};
