let params = [];
let movies = [];

function processParams() {
  const url = window.location.href;
  const params = url.split('/');
  const lastParam = params[params.length - 1];
  return lastParam;
}

async function load() {
  let container = document.querySelector('.container');
  container.innerHTML =
    '<div class="d-flex justify-content-center my-3"><div class="spinner-border" role="status"></div></div>';
  try {
    processParams();
    let response = await fetch(`/peliculas/${processParams()}`);
    if (response.ok) {
      movies = await response.json();
      mostrarPeliculas();
      container.innerHTML = '';
    } else {
      container.innerHTML = '<h1>404 Error - Failed URL!</h1>';
    }
  } catch (response) {
    container.innerHTML = '<h1>500 conection error</h1>';
  }
}

function mostrarPeliculas() {
  let html = '';
  for (let movie of movies) {
    html += `
        <div class="card cardSize bg-dark m-2 border-light p-0" >
    <img src="${movie.imagen}" class="card-img-top" alt="foto pelicula">
    <div class="card-body">
      <h5 class="card-tittle text-light text-center">${movie.titulo}</h5>
  
     </div></div>
  
                `;
  }
  document.querySelector('#container').innerHTML = html;
}

load();
