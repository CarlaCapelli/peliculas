import { Injectable } from '@nestjs/common';
import { Pelicula } from './pelicula';
import { UPdateMovieDto } from './moviedto';
import { v4 } from 'uuid';

@Injectable()
export class PeliculasService {
  movies: Pelicula[] = [];

  constructor() {
    this.readCsv();
  }

  getAllMovies() {
    return this.movies;
  }

  getMovieByID(id: string): Pelicula {
    let getMovieByID = this.movies.find((movie) => movie.id == id);
    return getMovieByID;
  }

  getMoviesByGenero(genero: string): Pelicula[] {
    let getMoviesBygenero = this.movies.filter((movie) =>
      movie.generos.find((element) => element == genero),
    );
    return getMoviesBygenero;
  }

  getMoviesByTittle(tittle: string): Pelicula[] {
    let getMoviesByTittle = this.movies.filter(
      (movie) => movie.titulo == tittle,
    );
    return getMoviesByTittle;
  }

  addMovie(movie: any): string {
    const newMovie = new Pelicula(
      v4(),
      movie.titulo,
      movie.actores,
      movie.generos,
      movie.sinopsis,
      movie.imagen,
      movie.duracion,
      movie.fecha,
    );
    this.movies.push(newMovie);
    this.writeCsv();
    return 'ok';
  }

  updateMovie(id: string, updatedFields: UPdateMovieDto): Pelicula {
    const movie = this.getMovieByID(id);
    const newMovie = Object.assign(movie, updatedFields);
    this.movies = this.movies.map((movie) =>
      movie.id === id ? newMovie : movie,
    );
    this.writeCsv();
    return newMovie;
  }

  deleteMovie(id: string) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    this.writeCsv();
  }

  writeCsv() {
    const csvWriter = require('csv-write-stream');
    const fs = require('fs');
    const writer = csvWriter({ sendHeaders: false });
    writer.pipe(fs.createWriteStream('./src/peliculas/peliculas.csv'));
    const arreglo = this.movies;
    arreglo.forEach((fila) => {
      writer.write(fila);
    });
    writer.end();
  }

  readCsv() {
    const csv = require('csv');
    const fs = require('fs');
    fs.createReadStream('./src/peliculas/peliculas.csv')
      .pipe(csv.parse())
      .on('data', (row) => {
        let peli = new Pelicula(
          row[0],
          row[1],
          row[2].split(','),
          row[3].split(','),
          row[4],
          row[5],
          row[6],
          row[7],
        );
        this.movies.push(peli);
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
      });
  }
}
