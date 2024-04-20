import {ChangeDetectionStrategy, Component, ViewChild, inject, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CatalogoService } from '../servicios/catalogo.service';
import { Catalogo } from '../modelos/catalogo.interface';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule, FormsModule,  FormBuilder,FormGroup} from '@angular/forms'; 
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import axios from 'axios';
 

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [ 
     MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule, MatTableModule, MatPaginatorModule, MatInputModule, FormsModule,ReactiveFormsModule, MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeliculaComponent  implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  
  private catalogoService = inject(CatalogoService);  
  private fb = inject(FormBuilder)

  displayedColumns: string[] = ['id', 'title', 'description', 'genre']; 

  dataSource = new MatTableDataSource<any>; 
  form!: FormGroup;
 
  public title = '';
  public description = '';
  public genre = '';

  catalogoJson!: Catalogo ;   
  genres!: string[] ;  
 

 ngOnInit():void{
      this.searchFormInit();
      this.loadAll();       
  }
 
  searchFormInit() { 
    this.form = this.fb.group({
      title: ['', []],
      description: ['', []],
      genre:  ['', []] 
    })
  }

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
  getFilterPredicate() {  
    return (row: any, filters: string) => {
      // split string per '$' to array
      const filterArray = filters.split('$'); 
      const _title = filterArray[0];
      const _description = filterArray[1];
      const _genre = filterArray[2];

      const matchFilter = [];
     
      // Fetch data from row 
      const columnTitle = row.title;
      const columnDescription = row.description;
      const columnGenre= row.genre;

      // verify fetching data by our searching values 
      const customFilterT = columnTitle.toLowerCase().includes(_title);
      const customFilterD = columnDescription.toLowerCase().includes(_description);
      const customFilterG= columnGenre.toLowerCase().includes(_genre);

      // push boolean values into array 
      matchFilter.push(customFilterT);
      matchFilter.push(customFilterD);
      matchFilter.push(customFilterG);
      // return true if all values in array is true
      // else return false
      return matchFilter.every(Boolean);
    };
  }

  
  applyFilter() {
    
    const t = this.form!.get('title')!.value;
    const d = this.form!.get('description')!.value;
    const g = this.form!.get('genre')!.value; 
 
    this.title = t === null ? '' : t;
    this.description = d === null ? '' : d;
    this.genre= g === null ? '' : g;
    // create string of our searching values and split if by '$' 
    const filterValue =  this.title + '$' + this.description + '$' + this.genre;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } 


  
}
 

 