const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup  handlebars engine and views location
app.set("view engine", "hbs"); // connect dynamic viewing module
app.set("views", viewsPath); //castomising views folder
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  //set the route to view's template
  res.render("index", {
    title: "weather",
    name: "Julia",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about app",
    name: "Julia",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Julia",
    helpText: "This is some helpful text.",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found.",
    name: "Julia",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          address: req.query.address,
          forecast: forecastData,
          location: location,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found.",
    name: "Julia",
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
