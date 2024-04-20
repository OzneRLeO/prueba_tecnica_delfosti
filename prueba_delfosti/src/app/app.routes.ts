import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path:'',
        loadComponent: () => import('./pelicula/pelicula.component')
        .then(m => m.PeliculaComponent)
    }
];
