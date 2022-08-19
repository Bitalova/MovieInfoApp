const searchInput = document.getElementById('search-input');
const searchList = document.getElementById('search-list');
const resultList = document.getElementById('result-list');

async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();

    console.log(data.Search);

    if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
    let searchTerm = (searchInput.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let i = 0; i < movies.length; i++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('search-list-item');
        if (movies[i].Poster != "N/A")
            movieCover = movies[i].Poster;
        else
            movieCover = "notfound.png";

        movieListItem.innerHTML = `
                <div class = "search-item-thumbnail">
                    <img src = "${movieCover}">
                </div>
                <div class = "search-item-info">
                    <h3>${movies[i].Title}</h3>
                    <p><b>Writer:</b> ${movies[i].Writer}</p>
                    <p><b>Actors: </b>${movies[i].Actors}</p>
                    <p>${movies[i].Year}</p>
                </div>
                `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
};

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {

            console.log(movie.dataset.id);

            searchList.classList.add('hide-search-list');
            searchInput.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();

            console.log(movieDetails);

            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details) {
    resultList.innerHTML = `
                <div class = "movie-cover">
                    <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
                </div>
                <div class = "movie-info">
                <h3 class = "movie-title">${details.Title}</h3>
                <ul class = "movie-misc-info">
                    <li class = "year">Year: ${details.Year}</li>
                    <li class = "rated">Ratings: ${details.Rated}</li>
                    <li class = "released">Released: ${details.Released}</li>
                </ul>
                <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
                <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
                <p class = "actors"><b>Actors: </b>${details.Actors}</p>
                <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
                <p class = "language"><b>Language:</b> ${details.Language}</p>
                <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
            </div>
            `;
}

window.addEventListener('click', (e) => {
    if (e.target.className != "search-input") {
        searchList.classList.add('hide-search-list');
    }
});