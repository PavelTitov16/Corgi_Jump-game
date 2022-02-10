
/* Get Data & Show Data */
const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b00fd67eb6b3766f4aefa4a4cf2c18c6";
const imgUrl = "https://image.tmdb.org/t/p/w500";
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
    <div class="front">
      <img src="${imgUrl}${result.poster_path}" "alt="poster"/>
      <div class="${colorRate(result.vote_average)}">${result.vote_average}</div>
      <h2 class="movie-title">${result.title}</h2>
    </div>
    <div class="back">
        <h3>Overview:</h3>
        <p>${result.overview}</p>
        <span class="movie-title">${result.release_date}</span>
    </div>`

    const frontCard = movie.querySelector('.front');
    const backCard = movie.querySelector('.back');

    movie.addEventListener('click', () => {
      frontCard.classList.toggle("active");
      backCard.classList.toggle("active");
    })
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
}

/*movie.addEventListener('mousedown', () => {
  backCard.classList.remove("active");
})*/
