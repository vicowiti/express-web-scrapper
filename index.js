const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const PORT = 5001;
const app = express();

const url = "https://nation.africa/";
app.use(cors());
//Routing

app.get("/", (req, res) => {
  res.status(200).send("This is my web scrapper");
});

app.get("/api/data", (req, res) => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const headlines = [];

      const $ = cheerio.load(html);
      $(".headline-teasers_item", html).each(function () {
        const title = $(this).text();
        const url = "https://nation.africa" + $(this).find("a").attr("href");
        headlines.push({
          title,
          url,
        });
      });
      res.status(200).json(headlines);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
