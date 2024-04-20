import { Pelicula } from "./pelicula.interface";

export interface Catalogo{ 
    movies: Pelicula[];
    genres: string[];
}