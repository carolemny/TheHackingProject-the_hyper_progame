import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { platforms, allPlatformsImg } from "./Docs";
import { GamesListQueryManager } from "./GamesListQueryManager";

const PageList = (argument = "") => {
  let token = process.env.APIKEY;

  const queryManager = new GamesListQueryManager(
    token,
    null,
    null,
    "2021-05-01",
    "2022-05-01"
  );

  const render = () => {
    pageContent.innerHTML = `

      ${Nav()}
      <header>
        <h1>Welcome,</h1>
        <p>The Hyper Progame is the world's premier event for computer and video games and related products. At The Hyper Progame, the video game industy's top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest, and most innovative in the interactive entertainment industy. For three exiting days, leading-edge compagnies, groundbrealing new technologies, and never-before seen products will be showcased. The Hyper Progame connects you with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure</p>
      </header>
      <select id="select-platform" class="custom-select custom-select-lg mb-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <option selected id="active-select" value="">Platforms : any</option>
        ${platforms
          .map(
            (platform) =>
              `<option value="${platform.id}">${platform.name}</option>`
          )
          .join("")}
      </select>
      <section class="page-list mx-auto">
        <div class="articles d-flex row">...loading</div>
      </section>
      <div id="btn-more" class="d-flex justify-content-center my-5">
        <button class="btn btn-lg btn-more">Show more</button>
      </div>
      ${Footer()}
    `;
    let select = document.getElementById("select-platform");
    select.addEventListener("change", (e) => {
      // console.log(select.value);
      queryManager.platform = select.value;
      // console.log(queryManager.platform);
      preparePage();
    });

    preparePage("");
    let input = document.getElementById("input-search");
    input.addEventListener("keypress", (e) => {
      if (e.code == "Enter") {
        queryManager.search = input.value;
        queryManager.startDate = null;
        queryManager.endDate = null;
        preparePage();
      }
    });
  };

  const preparePage = () => {
    let articles = "";
    let counter = 0;
    let btn = document.getElementById("btn-more");

    btn.style.visibility = "visible";

    const btnClone = btn.cloneNode(true);
    btn.parentNode.replaceChild(btnClone, btn);
    btn = btnClone;

    btn.addEventListener("click", () => {
      counter++;
      fetchList(true);
      if (counter > 1) {
        btn.style.visibility = "hidden";
      }
    });

    const mapPlatformImg = (slugName) => {
      return allPlatformsImg[slugName]
        ? `<img src="src/images/${allPlatformsImg[slugName]}" class="ml-0 mr-4">`
        : "";
    };

    const fetchList = (showMore = false) => {
      queryManager.getGames(showMore).then((games) => {
        games.forEach((article) => {
          let aryPlatforms = [];

          article.platforms.map((el) => {
            aryPlatforms.push(el.platform.slug);
          });

          articles += `
                <div id="${
                  article.id
                }" class="card col-md-4 col-sm-6 col-xs-12 mx-auto">
                  <img class="card-img-top" src="${
                    article.background_image
                  }" alt="game-picture">
                  <div class="show-game-infos">
                    <p>Date de sortie : ${article.released} </p>
                    <p>Éditeur : </p>
                    <p>Genre : ${article.genres.map((genre) => genre.slug)} </p>
                    <p>Note : ${article.rating} </p>
                    <p>Nombre de votes : ${article.ratings_count} </p>
                  </div>
                  <div class="card-body mx-0 px-0">
                    <h5 class="card-title">${article.name}</h5>
                    <a href="#pagedetail/${
                      article.id
                    }" class="stretched-link"></a>
                    <div class="text-muted d-flex justify-content-start">${aryPlatforms
                      .map((slug) => mapPlatformImg(slug))
                      .join("")}
                    </div>
                  </div>
                </div>
              `;
        });

        document.querySelector(".page-list .articles").innerHTML = articles;
      });
    };

    fetchList();
  };

  render();
};

export { PageList };
