module.exports = {
  PORT: process.env.PORT,
  CLARIFAI_API_KEY: process.env.CLARIFAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME
  }
};
