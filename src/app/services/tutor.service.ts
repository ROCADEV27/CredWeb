import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

import { Tutor } from '../models/tutor';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTutores()
  {
    return this.http.get(`${this.API_URI}/tutor`);
  }

  getTutor(id: string) {
    return this.http.get(`${this.API_URI}/tutor/${id}`);
  }

  deleteTutor(IdAlumno: string, token: string){
    //return this.http.delete(`${this.API_URI}/alumno/${IdAlumno}`);
    let param = {alumno:IdAlumno,token:token};
    //console.log("a borrar: " + param);
    //console.log("bbbborrar: " + IdAlumno);
    return this.http.post(`${this.API_URI}/tutor/borrar`,param);
  }

  saveTutor(Tutor: Tutor){
    return this.http.post(`${this.API_URI}/tutor`,Tutor);
  }

  updateTutor(IdTutor: string, updatedTutor: Tutor): Observable<Tutor> {
    return this.http.put(`${this.API_URI}/tutor/${IdTutor}`, updatedTutor);
  }
}
