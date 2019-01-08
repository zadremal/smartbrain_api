const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");
const Clarifai = require("clarifai");

const register = require("./controllers/register");
const singin = require("./controllers/singin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const { NODE_ENV, PORT, CLARIFAI_API_KEY, DB } = require("./config.js");

const clarifaiApp = new Clarifai.App({
  apiKey: CLARIFAI_API_KEY
});

getDbConnectionSettings = () => {
  return NODE_ENV === "development"
    ? {
        host: DB.HOST,
        user: DB.USER,
        password: DB.PASSWORD,
        database: DB.NAME
      }
    : {
        connectionString: "asdqwdweded"
      };
};

const db = knex({
  client: "pg",
  connection: getDbConnectionSettings()
});

app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/singin", singin.handleSingIn(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.post("/profile/:id", profile.handleGetProfile(db));
app.put("/image", image.handleImage(db));
app.post("/imageRecognition", image.handleImageRecognition(clarifaiApp));

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
