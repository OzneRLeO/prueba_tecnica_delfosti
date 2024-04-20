 
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, EMPTY, map, Observable, shareReplay } from "rxjs";  
 

@Injectable({
  providedIn: 'root'
})
 
export class CatalogoService {
  private http = inject(HttpClient);
  



  cargarDesdeJson(rutaJson : string) : Observable<any> {
      
    return this.http.get<any[]>(rutaJson).pipe(
          map(res => {
              if ( res == null ) {
                return null;
              }

              return res;
          }),
          shareReplay<any>({ bufferSize: 1, refCount: true }),
          catchError(err => {
            return EMPTY;
          })
        );
  }


 
}