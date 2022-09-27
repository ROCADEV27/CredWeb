import { Component, OnInit } from '@angular/core';

import { alumnosService} from '../../services/alumnos.service';


@Component({
  selector: 'app-alumno-list',
  templateUrl: './alumno-list.component.html',
  styleUrls: ['./alumno-list.component.css']
})
export class AlumnoListComponent implements OnInit {
  
  alumnos: any = [];

  constructor(private alumnosService: alumnosService) { }

  ngOnInit(): void {
    this.getAlumnos();
    
  }

  getAlumnos(){
    this.alumnosService.getAlumnos().subscribe(
      res => {
        console.log(res);
        this.alumnos = [];
      
        this.alumnos = res;
        //this.getAlumnos();
      },
      err => console.error(err)


    )
  }

  deleteAlumno(IdAlumno: string,token: string){
    //console.log(IdAlumno)
    
    this.alumnosService.deleteAlumno(IdAlumno,"seguridad").subscribe(
      (res:any) => {
        console.log(res); 
        if (res.status)
          setTimeout(() => {
            this.getAlumnos();  
          }, 1000);
          
      },
      err => console.log("error: " + err)
    )
  }

  editAlumno(id: string){
    console.log(id);
  }

}
