import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

import { AlumnoTutor } from '../models/alumno-tutor';


@Injectable({
  providedIn: 'root'
})
export class AlumnotutorService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAlumnosTutores()
  {
    return this.http.get(`${this.API_URI}/alumnotutor`);
  }


}
