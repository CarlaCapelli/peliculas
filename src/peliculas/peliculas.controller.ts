import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UPdateMovieDto } from './moviedto';
import { Pelicula } from './pelicula';

import { PeliculasService } from './peliculas.service';
@Controller('peliculas')
export class PeliculasController {
  constructor(private peliculasService: PeliculasService) {}

  @Get()
  getAllMovies() {
    return this.peliculasService.getAllMovies();
  }

  @Get(':genero')
  getMoviesByGenero(@Query('genero') genero: string): Pelicula[] {
    return this.peliculasService.getMoviesByGenero(genero);
  }
  @Get(':titulo')
  getMoviesByTittle(@Query('titulo') titulo: string): Pelicula[] {
    return this.peliculasService.getMoviesByTittle(titulo);
  }

  @Get('/pelicula/:id')
  getMovieByID(@Param('id') id): Pelicula {
    return this.peliculasService.getMovieByID(id);
  }

  @Post()
  addMovie(@Body() newPelicula: any): string {
    return this.peliculasService.addMovie(newPelicula);
  }

  @Put(':id')
  updateMovie(@Param('id') id: string, @Body() UploadedFiles: UPdateMovieDto) {
    return this.peliculasService.updateMovie(id, UploadedFiles);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.peliculasService.deleteMovie(id);
  }
}
