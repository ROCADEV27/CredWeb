import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class alumnosService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAlumnos()
  {
    return this.http.get(`${this.API_URI}/alumno`);
  }

  getAlumno(id: string) {
    return this.http.get(`${this.API_URI}/alumno/${id}`);
  }

  deleteAlumno(IdAlumno: string, token: string){
    //return this.http.delete(`${this.API_URI}/alumno/${IdAlumno}`);
    let param = {alumno:IdAlumno,token:token};
    //console.log("a borrar: " + param);
    //console.log("bbbborrar: " + IdAlumno);
    return this.http.post(`${this.API_URI}/alumno/borrar`,param);
  }

  saveAlumno(game: Alumno){
    return this.http.post(`${this.API_URI}/alumno`,game);
  }

  updateAlumno(IdAlumno: string, updatedGame: Alumno): Observable<Alumno> {
    return this.http.put(`${this.API_URI}/alumno/${IdAlumno}`, updatedGame);
  }
}
