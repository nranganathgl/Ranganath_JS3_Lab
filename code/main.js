//via js dopcument get the search box and
//listen for the input text box and add event handler for the keypress event
//listen to the enter keyword press

const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/weather",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  //enter key is pressed in the search box
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  const url = `${api.base}?q=${query}&units=metric&appid=${api.key}`;
  //make API call
  fetch(url)
    .then((weather) => {
      return weather.json();
    })
    .then((response) => {
      //console.log(response);
      //Actual response
      displayResults(response);
    });
}

function displayResults(weather) {
  //use response to update the UI with actual data
  //call datebuilder

  let city = document.querySelector(".location .city");
  // city.innerText = `${weather.name}, ${weather.sys.country}`;
  city.innerText = `${weather.name}, ${getCountryName(weather.sys.country)}`;

  let date = new Date();
  let dateEl = document.querySelector(".location .date");
  dateEl.innerText = dateBuilder(date);

  let temp = document.querySelector(".current .temp");

  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weatherElm = document.querySelector(".current .weather");

  weatherElm.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".current .hi-low");

  hilow.innerText = `${Math.round(weather.main.temp_min)} °c / ${Math.round(
    weather.main.temp_max
  )} °c`;
}

function dateBuilder(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let dateVal = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return `${day} ${dateVal} ${month} ${year}`;
}

function getCountryName(countryCode) {
  if (countryCode == "IN") return "India";
  else return countryCode;
}
