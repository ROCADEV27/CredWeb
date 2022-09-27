import { Component, OnInit, HostBinding } from '@angular/core';
import { Alumno } from 'src/app/models/Alumno';
import { alumnosService } from 'src/app/services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, ReactiveFormsModule, RequiredValidator, Validators} from '@angular/forms';

@Component({
  selector: 'app-alumno-form',
  templateUrl: './alumno-form.component.html',
  styleUrls: ['./alumno-form.component.css']
})
export class AlumnoFormComponent implements OnInit {
form;  
  @HostBinding('class') classes = "row";

  alumno: Alumno = {
    IdAlumno: 0,
    Nombre: '',
    Paterno: '',
    Materno: '',
    IdEstado: 0,
    CURP: '',
    Sexo: '',
    Nacimiento: new Date('20220909'), //new Date(), TODO
    Status: true,
    CreatedAt: new Date()
  };
  edit: boolean = false;

  constructor(private alumnoService: alumnosService, private router: Router, 
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) { 
      this.form = formBuilder.group({
        nombre: ['',Validators.required],
        paterno: ['',Validators.required],
        materno: [''],
        estado: [''],
        curp: [''],
        sexo: [''],
        nacimiento: [''],
        calle: [''],
        numero: [''],
        colonia: [''],
        municipio: [''],
        postal: [''],
        status: [''],
        foto: [''],
      });

    }

  ngOnInit() {
    //console.log(params);
    const params = this.activatedRoute.snapshot.params;
    // antes asi params.id, ahora se soliciona asi params['id']
    if (params['id'])
    {
      this.alumnoService.getAlumno(params['id']).subscribe(
        res=> {
          console.log(res);
          this.alumno = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }  
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value)
      if (this.edit)
      {
        this.updateGame();
      }
      else
      {
        this.saveNewAlumno();
      }
    }
    else{
      alert("Ingrese todos los datos Requeridos")
    }
  }

  saveNewAlumno() {
    delete this.alumno.CreatedAt;
    delete this.alumno.IdAlumno;
    
    this.alumnoService.saveAlumno(this.alumno)
    .subscribe(
      res=> {
        console.log(res);
        this.router.navigate(['/alumno']);
      },
      err => console.error(err)
    )

  }

  updateGame(){
    console.log(this.alumno);
    const str = String(this.alumno.IdAlumno);
    delete this.alumno.CreatedAt;

    this.alumnoService.updateAlumno(str, this.alumno).subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/alumno']);
      },
      err => console.log(err)
    )
  }
  cancelOper(){
    this.router.navigate(['/alumno']);
  }
}