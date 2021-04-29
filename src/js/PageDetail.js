import { Nav } from "./Nav";
import { Footer } from "./Footer";

const PageDetail = (argument = "") => {
  //console.log("Page Detail", argument);
  let token = process.env.APIKEY;

  const preparePage = () => {
    //console.log(argument);
    let article = "";
    let articleStores = "";
    let articleScreens = "";
    let articleMovie = "";

    const fetchGame = (url) => {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((response) => {
          let movieCount = response.movies_count;
          if (movieCount > 0) {
            fetchMovie(
              `https://api.rawg.io/api/games/${argument}/movies?key=${token}`
            );
          }

          console.log(response);

          article += `
            <div class="jumbotron jumbotron-fluid mt-5 mb-2" style="background-image: url(${
              response.background_image
            });">
              <a href="${
                response.website
              }" class="btn my-btn btn-more" target="_blank">Check Website</a>
            </div>
            <div class="title px-4 d-flex row justify-content-between align-items-baseline">
              <h1>${response.name}</h1>
              <p> ${response.rating}/5 -  ${response.ratings_count} votes</p>
            </div>
            <div class="description px-3">
              <p>${response.description}</p>
            </div>
            <div class="row px-3">
              <div class="col-3">
                <p><strong>Release Date</strong></p>
                <p>${response.released}</p>
              </div>
              <div class="col-3">
                <p><strong>Developper(s)</strong></p>
                <p>${response.developers
                  .map((dev) => `${dev.name}`)
                  .join(", ")}</p>
              </div>
              <div class="col-3">
                <p><strong>Platforms</strong></p>
                <p>${response.platforms
                  .map((plat) => `${plat.platform.name}`)
                  .join(", ")}</p>
              </div>
              <div class="col-3">
                <p><strong>Publishers</strong></p>
                <p>${response.publishers
                  .map((pub) => `${pub.name}`)
                  .join(", ")}</p>
              </div>
            </div>
            <div class="row px-3">
              <div class="col-6">
                <p><strong>Genres</strong></p>
                <p>${response.genres
                  .map((genre) => `${genre.name}`)
                  .join(", ")}</p>
              </div>
              <div class="col-6">
                <p><strong>Tags</strong></p>
                <p>${response.tags.map((tag) => `${tag.name}`).join(", ")}</p>
              </div>
            </div>
          `;

          document.querySelector(".page-detail .article").innerHTML = article;
        });
    };

    const fetchScreens = (url) => {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((response) => {
          articleScreens += response.results
            .map((result, index) => {
              if (index < 4) {
                return `<div class="col col-sm-6 col-12"><img src="${result.image}"></div>`;
              }
              return null;
            })
            .join("");
          document.getElementById("article-screens").innerHTML = articleScreens;
        });
    };

    const fetchStores = (url) => {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          articleStores += `
            ${response.results
              .map((result) => `<a href="${result.url}">${result.url}</a>`)
              .join("")}
          `;

          document.getElementById("article-stores").innerHTML = articleStores;
        });
    };

    const fetchMovie = (url) => {
      fetch(`${url}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          articleMovie += `
              <video width="100%" controls>
                <source src="${response.results[0].data.max}" type="video/mp4"> 
              </video>
          `;

          document.getElementById("trailer").innerHTML = articleMovie;
          document
            .getElementById("trailer-container")
            .classList.remove("hidden");
        });
    };

    fetchGame(`https://api.rawg.io/api/games/${argument}?key=${token}`);
    fetchScreens(
      `https://api.rawg.io/api/games/${argument}/screenshots?key=${token}`
    );
    fetchStores(
      `https://api.rawg.io/api/games/${argument}/stores?key=${token}`
    );
  };

  const render = () => {
    pageContent.innerHTML = `
      ${Nav()}
      <section class="page-detail">
        <div class="article"></div>
        <div class="col px-4 my-1">
          <div class="row"><h1>BUY</h1></div>
          <div id="article-stores" class="row"></div>
        </div>
        <div id="trailer-container" class="col px-4 my-1 hidden">
          <div class="row"><h1>TRAILER</h1></div>
          <div id="trailer" class="row"></div>
        </div>
        <div class="col px-4 my-1">
          <div class="row"><h1>SCREENSHOTS</h1></div>
          <div id="article-screens" class="row"></div>
        </div>
      </section>
      ${Footer()}
    `;

    preparePage();
  };

  render();
};

export { PageDetail };
