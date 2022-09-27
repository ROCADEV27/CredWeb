import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, ReactiveFormsModule, RequiredValidator, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { alumnosService} from '../../services/alumnos.service';
import { TutorService} from '../../services/tutor.service';
import { AlumnotutorService } from 'src/app/services/alumnotutor.service';
import { PapaService } from 'src/app/services/papa.service';
import { getLocaleDateFormat } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Alumno } from 'src/app/models/Alumno';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tutor } from 'src/app/models/tutor';
import { AlumnoTutor } from 'src/app/models/alumno-tutor';
import { Papa } from 'src/app/models/papa';
import { DatePipe } from '@angular/common';

//Columns data types
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-masterdetail',
  templateUrl: './masterdetail.component.html',
  styleUrls: ['./masterdetail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class MasterdetailComponent implements OnInit {
  
form: any;
formtutor: any;
formpapa: any;
@HostBinding('class') classes = "row";
alumnos: any = [];
tutores: any = [];
alumnostutores: any = [];
IdAlumnoSeleccted: any;


// entidades

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

//tutor
Tutor: Tutor = {
  IdTutor: 0,
  NombreTutor: '',
  PaternoTutor: '',
  MaternoTutor: ''
}

//Alumnotutores para grid
AlumnTutor: AlumnoTutor = {
  IdAlumno: 0,
  MamaNombreTutor: '',
  MamaPaternoTutor: '',
  MamaMaternoTutor: ''
}
//Papa
papa: Papa = {
  IdPapa: 0,
  PapaNombre: '',
  PapaPaterno: '',
  PapaMaterno: ''
}


edit: boolean = false;

//modalSwitch!: boolean;
//nombrealumno: any;
//name: any;

@ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any> | undefined;
@ViewChild("myModalConf", {static: false}) myModalConf: TemplateRef<any> | undefined;
@ViewChild("myModalConfTutor", {static: false}) myModalConfTutor: TemplateRef<any> | undefined;
@ViewChild("myModalConfPadre", {static: false}) myModalConfPapa: TemplateRef<any> | undefined;
  DatePipe: any;

  constructor(private alumnoService: alumnosService, private router: Router, 
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,
    private modalService: NgbModal, private tourService: TutorService, private AlumnostutoresService: AlumnotutorService,
    private papaservice: PapaService) {
      // controles de alumno
      this.form = formBuilder.group({
        nombre: ['',Validators.required],
        paterno: ['',Validators.required],
        materno: [''],
        estado: [''],
        curp: [''],
        sexo: [''],
        nacimiento: [''],
        jardin: [''],
        calle: [''],
        numero: [''],
        colonia: [''],
        municipio: [''],
        postal: [''],
        status: [''],
        foto: [''],
        telefono: [''],
        correo: [''],
      });

      // los controles de tutor
      this.formtutor = formBuilder.group({
        nombretutor: ['',Validators.required],
        paternotutor: ['',Validators.required],
        maternotutor: [''],
        tutorrol: [''],
        tutorlegal: [''],
        estadotutor: [''],
        curptutor: [''],
        inetutor: [''],
        sexotutor: [''],
        nacimientotutor: [''],
        calletutor: [''],
        numerotutor: [''],
        coloniatutor: [''],
        municipiotutor: [''],
        postaltutor: [''],
        statustutor: [''],
        fototutor: [''],
        telefonotutor: [''],
        correotutor: [''],
      });

      // los controles de papa
      this.formpapa = formBuilder.group({
        papanombre: ['',Validators.required],
        papapaterno: ['',Validators.required],
        papamaterno: [''],
        papatutorlegal: [''],
        papaestado: [''],
        papacurp: [''],
        papaine: [''],
        papasexo: [''],
        papanacimiento: [''],
        papacalle: [''],
        papanumero: [''],
        papacolonia: [''],
        papamunicipio: [''],
        papapostal: [''],
        papastatus: [''],
        papafoto: [''],
        papatelefono: [''],
        papacorreo: [''],
      });
     }
//instanciamos controles de forbiddenNameValidator
  
  title = 'angularmaterial';
  //Columns names, table data from datasource, pagination and sorting
  columnsToDisplay: string[] = ['Nombre', 'Paterno', 'Materno', 'IdAlumno', 'actions'];
    dataSource = new MatTableDataSource<AlumnoTutor>(ELEMENT_DATA2);
  @ViewChild(MatPaginator, {static: true}) paginator:any = MatPaginator;
  expandedElement: PeriodicElement | null | undefined;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // Antes
    //this.getAlumnos();
    // ahora
    this.getAlumnosTutores();  

    //data: PeriodicElement[] = ELEMENT_DATA;
    //columns: string[] = Object.keys(this.data[0]);
  }

  // control de modales

  mostrarModalInfo(){
    this.modalService.open(this.myModalInfo);
  }
 
  // modal Alumno

  mostrarModalConf(IdAlumno: string){
    console.log(IdAlumno);
    if (IdAlumno == "0")
    {
      // limpieza para nuevo
      this.CleanAlumnoForm();
      this.edit = false;
    }
    else{
    // ediciòn de existente
    this.EditAlumno(IdAlumno);
    }
    // mostrado de modal
    this.modalService.open(this.myModalConf).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  
  }

  //modal Tutor
  mostrarModalConfTutor(IdTutor: string){
    console.log(IdTutor);
    this.EditAlumno(IdTutor);
    this.modalService.open(this.myModalConfTutor).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }

  //modal Papa
  mostrarModalConfPapa(IdPapa: string,IdAlumno: string){
    this.IdAlumnoSeleccted = IdAlumno;
    console.log(IdPapa);
    if (IdPapa == "0" || IdPapa == null)
    { 
      // limpieza para nuevo
      this.CleanPapaForm();
      this.edit = false;
    }
    else{
    this.EditPapa(IdPapa);
    }
    this.modalService.open(this.myModalConfPapa).result.then( r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }


  submittemp(){
    this.saveNewTutor();
}
  
  submitGlobal() {
    //console.log(this.form.valid);
    //console.log(this.edit); 
    if (this.formtutor.valid) {
      console.log(this.form.value)
      if (this.edit)
      {
        this.updateAlumno();
      }
      else
      { //primera Vez
        //Se pide datos del tutor
        //this.Tutor.IdTutor == 0 && 
        if (this.Tutor.NombreTutor == "")
        {
          //recabar los datos del tutor
        this.mostrarModalConfTutor("0");
        }
        else{
          // ta se tiene tanto alumno y tutor asi que guardar ambos
          
          //guardado de Tutor
          this.saveNewTutor();
        }

        //this.saveNewAlumno();
      }

    }
    else{
      alert("Ingrese todos los datos Requeridos de TUTOR")
    }
  }

  // alumno submit
  submit() {
    //console.log(this.form.valid);
    //console.log(this.edit); 
    if (this.form.valid) {
      console.log(this.form.value)
      if (this.edit)
      {
        this.updateAlumno();
      }
      else
      {
        this.saveNewAlumno();
      }

    }
    else{
      alert("Ingrese todos los datos Requeridos Alumno")
    }
  }
// guardado act de papa
  submitPapa() {
    //console.log(this.form.valid);
    //console.log(this.edit); 
    // set fecha
    // const fecha = this.DatePipe.transform(this.formpapa.PapaNacimiento,'yyyy-MM-dd');
    // this.papa.PapaNacimiento = fecha;

    //this.formpapa.papanacimiento = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    //this.papanacimiento =this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (this.formpapa.valid) {
      //console.log(this.formpapa.value)
      if (this.edit)
      {
        this.updatePapa();
      }
      else
      {
        
        this.saveNewPapa();
      }

    }
    else{
      alert("Ingrese todos los datos Requeridos PAPA")
    }
  }

  // acciones de models (Entidades)

  // AlumnoTutor

  getAlumnosTutores(){
    this.AlumnostutoresService.getAlumnosTutores().subscribe(
      res => {
        console.log(res);
        this.alumnostutores = [];
        this.alumnostutores = res;
        ELEMENT_DATA2 =  this.alumnostutores;
        //si jalaba
        //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        //prueba
        this.dataSource = new MatTableDataSource<AlumnoTutor>(ELEMENT_DATA2);
        //cerrar el modal
        //this.modalService.dismissAll();
        
      }, 
      err => console.error(err)


    )
  }
  // Alumno
  saveNewAlumno() {
    delete this.alumno.CreatedAt;
    delete this.alumno.IdAlumno;
    console.log(this.alumno.Municipio);

    this.alumnoService.saveAlumno(this.alumno)
    .subscribe(
      res=> {
        console.log(res);
        //this.router.navigate(['/alumno']);
        //actualizamos grid
        this.getAlumnosTutores();
        //close modal
        this.modalService.dismissAll();
      },
      err => console.error(err)
    )

  }

  updateAlumno(){
    console.log(this.alumno);
    const str = String(this.alumno.IdAlumno);
    delete this.alumno.CreatedAt;

    this.alumnoService.updateAlumno(str, this.alumno).subscribe(
      res =>{ 
        console.log(res);
        //this.router.navigate(['/alumno']);
        //actualizamos grid
        this.getAlumnosTutores();
        console.log(this.alumnos);
        //close modal
        this.modalService.dismissAll();
      },
      err => console.log(err)
    )
  }

  getAlumnos(){
    this.alumnoService.getAlumnos().subscribe(
      res => {
        //console.log(res);
        this.alumnos = [];
        this.alumnos = res;
        ELEMENT_DATA2 =  this.alumnos;
        console.log(ELEMENT_DATA2);
        //si jalaba
        //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        //prueba
        this.dataSource = new MatTableDataSource<AlumnoTutor>(ELEMENT_DATA2);
        //cerrar el modal
        //this.modalService.dismissAll();
        
      }, 
      err => console.error(err)


    )
  }

  EditAlumno(IdAlumno: string){
    if (IdAlumno != null)
    {
      this.alumnoService.getAlumno(IdAlumno).subscribe(
        res=> {
          console.log(res);
          this.alumno = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  deleteAlumno(IdAlumno: string,token: string){
    //console.log(IdAlumno)
    console.log("desde WEB:::::: IdAlumno   " + IdAlumno);
    this.alumnoService.deleteAlumno(IdAlumno,"seguridad").subscribe(
      (res:any) => {
        //console.log(res); 
        if (res.status)
          setTimeout(() => {
            this.getAlumnos();  
          }, 1000);
          
      },
      err => console.log("error: " + err)
    )
  }
  // Tutor
  saveNewTutor() {
    delete this.Tutor.CreatedAt;
    delete this.Tutor.IdTutor;
    
    this.tourService.saveTutor(this.Tutor)
    .subscribe(
      res=> {
        console.log(res);
        //this.router.navigate(['/alumno']);
        //actualizamos grid
        //this.getAlumnos();
        //close modal
        this.modalService.dismissAll();
      },
      err => console.error(err)
    )

  }

  deleteTutor(IdTutor: string,token: string){
    //console.log(IdAlumno)
    console.log("desde WEB:::::: IdTutor   " + IdTutor);
    this.tourService.deleteTutor(IdTutor,"seguridad").subscribe(
      (res:any) => {
        //console.log(res); 
        if (res.status)
          setTimeout(() => {
            this.getAlumnos(); //TODO tour  
          }, 1000);
          
      },
      err => console.log("error: " + err)
    )
  }

  EditTutor(IdTutor: string){
    if (IdTutor != null)
    {
      this.tourService.getTutor(IdTutor).subscribe(
        res=> {
          console.log(res);
          this.Tutor = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  getTutores(){
    this.tourService.getTutores().subscribe(
      res => {
        //console.log(res);
        //this.tutores = [];
        this.tutores = res;
        //ELEMENT_DATA2 =  this.tutores;
        //si jalaba
        //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        //prueba
        //this.dataSource = new MatTableDataSource<Tutor>(ELEMENT_DATA2);
        //cerrar el modal
        //this.modalService.dismissAll();
        
      }, 
      err => console.error(err)


    )
  }

  updateTutor(){
    console.log(this.Tutor);
    const str = String(this.Tutor.IdTutor);
    delete this.Tutor.CreatedAt;

    this.tourService.updateTutor(str, this.Tutor).subscribe(
      res =>{ 
        console.log(res);
        //this.router.navigate(['/alumno']);
        //actualizamos grid
        this.getTutores();
        //close modal
        this.modalService.dismissAll();
      },
      err => console.log(err)
    )
  }

  //Papa

  saveNewPapa() {
    delete this.papa.PapaCreatedAt;
    delete this.papa.IdPapa;
    console.log(this.papa.PapaMunicipio);
    this.papa.IdAlumno = this.IdAlumnoSeleccted;

    this.papaservice.savePapa(this.papa) 
    .subscribe(
      res=> {
        console.log(res);
        //this.router.navigate(['/alumno']);
        //actualizamos grid
        this.getAlumnosTutores();
        //close modal
        this.modalService.dismissAll();
        this.IdAlumnoSeleccted = "0";
      }, 
      err => console.error(err)
    )

  }


  deletePapa(IdPapa: string,token: string){
    console.log(IdPapa)
    console.log("desde WEB PAPA::::::  idPAPA " + IdPapa);
    this.papaservice.deletePapa(IdPapa,"seguridad").subscribe(
      (res:any) => {
        //console.log(res); 
        if (res.status)
          setTimeout(() => {
            this.getAlumnosTutores();  
          }, 1000); 
           
      },
      err => console.log("error: " + err)
    )
  }

  EditPapa(IdPapa: string){
    if (IdPapa != null)
    {
      this.papaservice.getPapa(IdPapa).subscribe(
        res=> {
          console.log(res);
          this.papa = res;
          this.edit = true;
        },
        err => console.error(err)
      ) 
    }
  }

  updatePapa(){
    console.log(this.papa);
    const str = String(this.papa.IdPapa);
    delete this.papa.PapaCreatedAt;

    //this.alumnoService.updateAlumno(str, this.alumno).subscribe(
    this.papaservice.updatePapa(str, this.papa).subscribe(
      res =>{ 
        console.log(res);
        //this.router.navigate(['/alumno']);
        //actualizamos grid
        this.getAlumnosTutores();
        //console.log(this.alumnos);
        //close modal
        this.modalService.dismissAll();
      },
      err => console.log(err)
    )
  }

  // navegación

  cancelOper(){
    this.router.navigate(['/alumno']);
  }

  CleanAlumnoForm()
  {
    // se limpa el model(interface)
  this.alumno.IdAlumno = 0;
  this.alumno.Nombre = "";
  this.alumno.Paterno = "";
  this.alumno.Materno = "";
  this.alumno.IdEstado = 0;
  this.alumno.CURP = "";
  this.alumno.Sexo = "";
  this.alumno.Nacimiento = new Date();
  this.alumno.IdJardin = 0;
  this.alumno.Calle = "";
  this.alumno.Numero = "";
  this.alumno.IdColonia = 0;
  this.alumno.Municipio = "";
  this.alumno.Postal = 0;
  this.form.Postal = "";
  this.alumno.Status = true;
  this.form.Status = 0;
  this.alumno.Foto = "";
  this.alumno.Telefono = "";
  this.alumno.Correo = "";
  }

  CleanPapaForm()
  {
    // se limpa el model(interface)
    this.papa.IdPapa = 0;
    this.papa.PapaNombre = "";
    this.papa.PapaPaterno = "";
    this.papa.PapaMaterno = "";
    this.papa.PapaIdEstado = 0;
    this.papa.PapaTutorLegal = false;
    this.papa.PapaCURP = "";
    this.papa.PapaINE = ""; 
    this.papa.PapaSexo = "";
    this.papa.PapaNacimiento = new Date();
    this.papa.PapaCalle = "";
    this.papa.PapaNumero = "";
    this.papa.PapaIdColonia = 0;
    this.papa.PapaMunicipio = "";
    this.papa.PapaPostal = 0;
    this.form.PapaPostal = "";
    this.papa.PapaStatus = true;
    this.form.papastatus = 0;
    this.papa.PapaFoto = "";
    this.papa.PapaTelefono = 0;
    this.papa.PapaCorreo = "";
  }
}
// Validaciones

function forbiddenNameValidator(arg0: RegExp): any {
  throw new Error('Function not implemented.');
}

let ELEMENT_DATA2: Alumno[] = [];

let ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];

function getAlumnos() {
  throw new Error('Function not implemented.');
}

// Limpieza de controles


