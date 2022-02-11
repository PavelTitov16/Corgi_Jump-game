/* Get Data & Show Data */
const apiKey = `b00fd67eb6b3766f4aefa4a4cf2c18c6`;
const apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;
const imgUrl = `https://image.tmdb.org/t/p/w500`;
console.log(apiUrl);

const main = document.getElementById("main");

const getData = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json();

  console.log(data);

  showData(data);
};
getData(apiUrl);

const showData = (data) => {
  main.innerHTML = "";
  data.results.forEach(result => {
    let movie = document.createElement('article');
    movie.classList.add("movie");
    movie.innerHTML = `
    <div class="movie-content">
      <section class="front">
        <img src="${imgUrl}${result.poster_path}" "alt="poster"/>
        <div class="${colorRate(result.vote_average)}">${result.vote_average}</div>
        <h2 class="movie-title">${result.title}</h2>
    </section>
    <section class="back">
        <h3 class="back-title">Overview:</h3>
        <p class="back-text">${result.overview}</p>
        <h3 class="back-title">Popularity:</h3>
        <progress max="10" value="${result.vote_average}"></progress>
        <h3 class="back-title">Release Date:</h3>
        <span class="movie-info">${result.release_date}</span>
    </section>  
    </div>`

    /* Animation */
    const frontCard = movie.querySelector('.front');
    const backCard = movie.querySelector('.back');
    const movContent = movie.querySelector('.movie-content');

    movie.addEventListener('click', () => {
      movContent.classList.toggle("active");
      frontCard.classList.toggle("active");
      backCard.classList.toggle("active");
    })

    backCard.addEventListener('mouseout', () => {
      movContent.classList.remove("active");
      frontCard.classList.remove("active");
      backCard.classList.remove("active");
    })
    /* Animation */

    main.appendChild(movie);
  });
}

const colorRate = (rate) => {
  if (rate >= 7) {
    return "green";
  } else if (rate <= 4) {
    return "red";
  }
  return "gray";
};

/* Search Data */
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form = document.getElementById("form");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".find");

const searchData = async (query) => {
  const res = await fetch(searchUrl + query);
  const foundTerm = await res.json();

  console.log(foundTerm);

  showData(foundTerm);
};

searchBtn.addEventListener('click', () => {
  if (search.value) {
    searchData(search.value);
  }
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event);
  if (search.value) {
    searchData(search.value);
  }
});
/* Search Data */