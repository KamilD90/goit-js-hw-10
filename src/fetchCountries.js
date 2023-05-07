import Notiflix from 'notiflix';
export { fetchCountries };

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      // Sprawdzamy, czy odpowiedź jest poprawna (status HTTP 200-299). Jeśli nie, rzucony zostanie wyjątek z komunikatem, że odpowiedź sieciowa nie była poprawna. Jeśli odpowiedź jest poprawna w następnym kroku dane z serwera parsujemy za pomocą metody .json()
      if (!response.ok) {
        throw Notiflix.Notify.failure('Network response was not ok');
      }
      return response.json();
      //   Metoda response.json() przetwarza dane w formacie JSON zwrócone z serwera na obiekt JavaScript.Następnie te dane możemy wokorzystać w aplikacji do dalszych działań
      //   Funkcja zwraca obiekt obietnicy zawierający przetworzone dane.
    })

    .catch(error => {
      // - Metoda .catch() zostanie wywołana, gdy obietnica zostanie odrzucona. W argumencie metody otrzymujemy obiekt błędu.
      console.error('There was problem with the fetch operation: ', error);
      //   Metoda console.error() jest używana do wypisywania komunikatów o błędach. Komunikaty wypisywane za pomocą console.error() są wyświetlane w konsoli przeglądarki w sposób wyróżniający, zazwyczaj w kolorze czerwonym, co ułatwia ich zauważenie i identyfikację.
    });
}

// Aby dowiedzieć się, czy obietnica została rozwiązana, możemy użyć metody .then() na zwróconej przez funkcję fetchCountries() obietnicy. Ta metoda będzie wywołana, gdy obietnica zostanie rozwiązana, i jako argument przyjmie wynik zwrócony przez obietnicę. Możemy również dodać blok .catch() do łapania ewentualnych błędów podczas wykonywania żądania HTTP.
