import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {environment} from "../../../environment/environments";
import {Pelicula} from "../model/pelicula.model";

@Injectable({
  providedIn: 'root'
})

export class HttpDataService {
  base_Url = environment.baseUrl;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  createItem(item: any): Observable<Pelicula> {
    console.log(item);
    return this.http
      .post<Pelicula>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Pelicula> {
    return this.http
      .get<Pelicula>(this.base_Url)
      .pipe(retry(2), catchError(this.handleError));
  }
  getItem(id: string): Observable<Pelicula> {
    return this.http
      .get<Pelicula>(this.base_Url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }


  updateItem(id: string, item: any): Observable<Pelicula> {

    return this.http
      .put<Pelicula>(this.base_Url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id: any): Observable<Pelicula> {
    console.log(this.base_Url + '/' + id)
    console.log(id)
    return this.http
      .delete<Pelicula>(this.base_Url + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
