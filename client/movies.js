let movies = [];

$('.modal').on('hidden.bs.modal', function () {
  $(this).find('form')[0].reset();
});

async function load() {
  let container = document.querySelector('#status');
  container.innerHTML =
    '<div class="d-flex justify-content-center my-3"><div class="spinner-border" role="status"></div></div>';
  try {
    let response = await fetch('/peliculas');
    if (response.ok) {
      let peliculas = await response.json();
      movies = peliculas;
      mostrarPeliculas();
      container.innerHTML = '';
    } else {
      container.innerHTML = '<h1>404 Error - Failed URL!</h1>';
    }
  } catch (response) {
    container.innerHTML = '<h1>500 conection error</h1>';
  }
}
let btnAgregar = document.querySelector('#btnAgregar');
btnAgregar.addEventListener('click', agregarPelicula);

function mostrarPeliculas() {
  let html = '';
  for (let movie of movies) {
    html += `
      <div class="card cardSize bg-dark m-2 border-light p-0" >
  <img src="${movie.imagen}" class="card-img-top" alt="foto pelicula">
  <div class="card-body">
    <h5 class="card-tittle text-light text-center">${movie.titulo}</h5>
  <div class="row">
    <button type="button" class="btn btn-primary btnUpdPelicula" ident="${movie.id}" data-toggle="modal" data-target="#soymodal">Actualizar</button>
   <button class="btnDelPelicula btn btn-danger mt-2 " identificador="${movie.id}">Borrar</button>
    <a  class=" btnVerPelicula btn btn-warning mt-2" ide=${movie.id} role="button">Ver pelicula</a>
</div></div></div>`;

    document.querySelector('#container').innerHTML = html;
    let botonesBorrar = document.querySelectorAll('.btnDelPelicula');
    botonesBorrar.forEach((e) => {
      e.addEventListener('click', btnBorrarClick);
    });
    let botonesActualizar = document.querySelectorAll('.btnUpdPelicula');
    botonesActualizar.forEach((e) => {
      e.addEventListener('click', btnActualizarClick);
    });
    let botonesVer = document.querySelectorAll('.btnVerPelicula');
    botonesVer.forEach((e) => {
      e.addEventListener('click', singleMovie);
    });
  }
}

let generos;

function agregarPelicula() {
  generos = [];
  let titulo = document.getElementById('titulo').value;
  let actores = document.getElementById('actores').value;
  let actors = actores.split(',');
  let genre = document.getElementsByName('generos');
  for (let genero of genre) {
    if (genero.checked) {
      generos.push(genero.value);
    }
  }
  let sinopsis = document.getElementById('sinopsis').value;
  let imagen = document.getElementById('imagen').value;
  let duracion = document.getElementById('duracion').value;
  let fecha = document.getElementById('fecha').value;
  let pelicula = {
    titulo: titulo,
    actores: actors,
    generos: generos,
    sinopsis: sinopsis,
    imagen: imagen,
    duracion: duracion,
    fecha: fecha,
  };
  if (agregarSRV(pelicula)) {
    movies.push(pelicula);
    mostrarPeliculas();
  }
  load();
}

async function agregarSRV(datos) {
  let respuesta = await fetch('/peliculas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return (await respuesta.text()) == 'ok';
}

async function btnBorrarClick() {
  let id = this.getAttribute('identificador');
  await fetch(`/peliculas/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  load();
}

let identificador;
function btnActualizarClick() {
  identificador = this.getAttribute('ident');
  for (let pelicula of movies) {
    if (identificador === pelicula.id) {
      document.querySelector('#inputTitulo').value = pelicula.titulo;
      document.querySelector('#inputSinopsis').value = pelicula.sinopsis;
    }
  }
}

async function btnActualiza() {
  let peliculaActualizada = {
    titulo: document.querySelector('#inputTitulo').value,
    sinopsis: document.querySelector('#inputSinopsis').value,
  };

  await fetch(`/peliculas/${identificador}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },

    body: JSON.stringify(peliculaActualizada),
  });
  load();
}

let btnActualizar = document.getElementById('actualizar');
btnActualizar.addEventListener('click', btnActualiza);

function singleMovie() {
  let id = this.getAttribute('ide');
  this.setAttribute('href', `singleMovie.html?peliculas/pelicula/${id}`);
}

let generoLink = document.querySelectorAll('.linkGenero');
generoLink.forEach((e) => {
  let genero = e.name;
  e.addEventListener('click', () => {
    e.setAttribute(
      'href',
      `moviesByGenero.html?peliculas/genero?genero=${genero}`,
    );
  });
});

load();
