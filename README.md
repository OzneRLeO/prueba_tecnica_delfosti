 
## Installing

Package manager
```javascript
Using npm:
$ npm install 
$ npm install axios
$ npm install bootstrap 
```
### Installing (If there a older version that will needs update)

1. Update your Angular CLI.
```javascript
npm install -g @angular/cli@17
```


2. Update your Angular core packages.
   
   This will update all of your Angular core packages to the latest version, including @angular/core, @angular/compiler, and @angular/platform-browser.
```javascript
ng update @angular/core
```
 

3. Update your other Angular packages.
If you are using any other Angular packages, such as @angular/material, you will need to update them individually. You can do this using the following command:
```javascript
ng update @angular/material
```
## Add used
Material UI
```javascript
$ ng add @angular/material

```
## Component created
Command for create the component
```javascript
$ ng generate c pelicula

```

## File JSON
 
```javascript
{
    "movies": [
      {
        "id": 1,
        "title": "The Shawshank Redemption",
        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "genre": "Drama"
      },
      {
        "id": 2,
        "title": "Inception",
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        "genre": "Action"
      },
      {
        "id": 3,
        "title": "The Dark Knight",
        "description": "When the menace known as The Joker emerges from his mysterious pastt he wreaks havoc and chaos on the people of Gotham.",
        "genre": "Action"
      },
      {
        "id": 4,
        "title": "Pulp Fiction",
        "description": "The lives of two mob hitmen, a boxer, a gangsteris wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "genre": "Crime"
      },
      {
        "id": 5,
        "title": "The Godfather",
        "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son",
        "genre": "Crime"
      },
      {
        "id": 6,
        "title": "Fight Club",
        "description": "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        "genre": "Drama"
      }
    ],
    "genres": [
      "Drama",
      "Action",
      "Crime"
    ]
  }

```

# Indicaciones
- El aplicativo se trabajo en Angular 17, se añade personalización de version en la parte INSTALLING (no menor a Angular 15).
- Los términos empleados para la vista fueron hechos en ingles como por ejemplo "título de película" se empleo su igual "title" para que no perdiese coherencia con los datos del archivo JSON
- Para consumir el archivo JSON se empleo axios por defecto, mas tambien se añadio previamente una petición http para realizar el consumo comentado en el componente pelicula
```javascript
  loadAll(){


    // if use axios
    axios.get("assets/json/catalogo.json")
    .then((resultado) => {
      this.catalogoJson = resultado.data as Catalogo; 
      this.dataSource = new MatTableDataSource(this.catalogoJson.movies); 
      this.genres = this.catalogoJson.genres; 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.filterPredicate = this.getFilterPredicate();
    });

    // if don't use axios 

    /*  
        this.catalogoService.cargarDesdeJson("assets/json/catalogo.json").subscribe((resultado: Catalogo) => {
        this.catalogoJson = resultado;  

        this.dataSource = new MatTableDataSource(this.catalogoJson.movies); 
        this.genres = this.catalogoJson.genres; 
        this.dataSource.paginator = this.paginator; 
        this.dataSource.filterPredicate = this.getFilterPredicate();
      }); 
    */
 
  }  
``` 

