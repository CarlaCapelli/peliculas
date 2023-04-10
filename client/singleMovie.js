let params = [];

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
    let response = await fetch(
      `http://localhost:3000/peliculas/pelicula/${processParams()}`,
    );
    if (response.ok) {
      let pelicula = await response.json();
      verPelicula(pelicula);
      container.innerHTML = '';
    } else {
      console.log('carla');
      container.innerHTML = '<h1>404 Error - Failed URL!</h1>';
    }
  } catch (response) {
    console.log('carla'),
      (container.innerHTML = '<h1>500 conection error</h1>');
  }
}

function verPelicula(movie) {
  let titulo = document.getElementById('titulo');
  let actores = document.getElementById('actores');
  let generos = document.getElementById('generos');
  let sinopsis = document.getElementById('sinopsis');
  let fecha = document.getElementById('fecha');
  let duracion = document.getElementById('duracion');
  let imagen = document.getElementById('imagen');
  titulo.innerHTML = movie.titulo;
  actores.innerHTML = `Actores: ${movie.actores}`;
  generos.innerHTML = `Generos: ${movie.generos}`;
  sinopsis.innerHTML = movie.sinopsis;
  fecha.innerHTML = `Fecha: ${movie.fecha}`;
  duracion.innerHTML = `Duracion: ${movie.duracion} minutos`;
  imagen.src = movie.imagen;
}
load();
