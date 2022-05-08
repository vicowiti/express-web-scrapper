const feed = document.querySelector("#feed");

const url = "http://localhost:5001/api/data";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((article) => {
      const title = `<a href=${article.url} target="_blank"><h3>${article.title}</h3></a>`;
      const li = document.createElement("li");
      li.innerHTML = title;
      feed.appendChild(li);
    });
  })
  .catch((err) => console.error(err));
