import ExternalServices from "./externalServices";
import { loadHeaderFooter } from "./utils";
import { toMovieListing } from "./movie-listingRender";

loadHeaderFooter();

// Exposing search function to html
window.toMovieListing = toMovieListing;

function movieHomeShow() {
    const externals = new ExternalServices();
    const divContainer = document.querySelector("#movie_section");
    for (let i = 0; i <= 11; i++) {
        const movies = externals.returnMovies(externals.moviesSearch());
        movies.then((data) => {
            let arrayLen = data.Search.length;

            let index = Math.floor(Math.random() * arrayLen);
            let Id = data.Search[index].imdbID;

            let aSource = document.createElement("a");
            aSource.setAttribute("href", `./movie-details/?movie=${Id}`);

            let div = document.createElement("div");
            div.setAttribute("class", "recent-movies");

            let title = data.Search[index].Title;
            let h3 = document.createElement("h3");
            h3.innerHTML = title;

            let posterContainer = document.createElement("img");
            let posterSource = data.Search[index].Poster;
            if (posterSource === "N/A") {
                posterContainer.setAttribute(
                    "src",
                    `https://via.placeholder.com/300x450/000000/FFFFFF/?text=${data.Search[index].Title}`
                );
            } else {
                posterContainer.setAttribute("src", data.Search[index].Poster);
            }
            posterContainer.setAttribute("alt", title);
            aSource.appendChild(posterContainer);
            div.appendChild(aSource);
            div.appendChild(h3);
            divContainer.appendChild(div);
        });
    }
}

movieHomeShow();