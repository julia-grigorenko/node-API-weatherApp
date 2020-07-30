console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const img = document.querySelector("#img");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          const imageElement = document.createElement('img');
          imageElement.src = data.forecast.weather_icons;
          img.appendChild(imageElement);
          messageOne.textContent = data.location;
          messageTwo.textContent =
            "It is currently " +
            data.forecast.description +
            ". Feels like " +
            data.forecast.feelslike +
            " and actual temperature is " +
            data.forecast.temperature +
            " Celsius. There is " +
            data.forecast.cloudcover +
            "% of cloudcover. " +
            'Wind speed is ' +
            data.forecast.wind_speed +
            " Kilometers/Hour in " +
            data.forecast.wind_dir +
            " derection.";
          console.log(data.forecast);
        }
      });
    }
  );
});
