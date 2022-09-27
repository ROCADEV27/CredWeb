import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

import { Papa } from '../models/papa';

@Injectable({
  providedIn: 'root'
})
export class PapaService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPapas()
  {
    return this.http.get(`${this.API_URI}/papa`);
  }

  getPapa(id: string) {
    return this.http.get(`${this.API_URI}/papa/${id}`);
  }

  deletePapa(IdPapa: string, token: string){
    //return this.http.delete(`${this.API_URI}/alumno/${IdAlumno}`);
    let param = {papa:IdPapa,token:token};
    //console.log("a borrar: " + param);
    //console.log("bbbborrar: " + IdAlumno);
    return this.http.post(`${this.API_URI}/papa/borrar`,param);
  }

  savePapa(papa: Papa){
    return this.http.post(`${this.API_URI}/papa`,papa);
  }

  updatePapa(IdPapa: string, updatedPapa: Papa): Observable<Papa> {
    return this.http.put(`${this.API_URI}/papa/${IdPapa}`, updatedPapa);
  }

}
