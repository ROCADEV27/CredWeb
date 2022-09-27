export interface AlumnoTutor {
    IdAlumno?: number;
    Nombre?: string;
    Paterno?: string;
    Materno?: string;
    IdEstado?: number;
    CURP?: string;
    Sexo?: string;
    Nacimiento?: Date;
    IdJardin?: number;
    Calle?: string;
	Numero?: string;
	IdColonia?: number;
	Municipio?: string;
	Postal?: number;
    Status?: boolean;
    Foto?: string;
    Telefono?: string;
    Correo?: string;
    CreatedAt?: Date;
    PapaIdTutor?: number;
    MamaIdTutor?: number;
    RecolectorIdTutor?: number;
    PapaNombreTutor?: string;
    MamaNombreTutor?: string;
    RecolectorNombreTutor?: string;
    PapaPaternoTutor?: string;
    MamaPaternoTutor?: string;
    RecolectorPaternoTutor?: string;
    PapaMaternoTutor?: string;
    MamaMaternoTutor?: string;
    RecolectorMaternoTutor?: string;
    PapaFotoTutor?: string;
    MamaFotoTutor?: string;
    RecolectorFotoTutor?: string;

    //query

    // select DISTINCT 
//     t1.idAlumno,
//     A1.Nombre,
//     A1.Paterno,
//     A1.Materno,
//     A1.IdEstado,
//     A1.CURP,
//     A1.Sexo,
//     A1.Nacimiento,
//     A1.IdJardin,
//     A1.Calle,
// 	A1.Numero,
// 	A1.IdColonia,
// 	A1.Municipio,
// 	A1.Postal,
//     A1.Status,
//     A1.Foto,
//     A1.Telefono,
//     A1.Correo,
//     A1.CreatedAt,
//     MAX(IF(T1.IdTutorRol = 1, T1.IdTutor, 0)) AS PapaIdTutor,
//     MAX(IF(T2.IdTutorRol = 2, T2.IdTutor, 0)) AS MamaIdTutor,
//     MAX(IF(T3.IdTutorRol = 3, T3.IdTutor, 0)) AS RecolectorId,
//     MAX(IF(T1.IdTutorRol = 1, T1.NombreTutor, '')) AS PapaNombreTutor,
//     MAX(IF(T2.IdTutorRol = 2, T2.NombreTutor, '')) AS MamaNombreTutor,
//     MAX(IF(T3.IdTutorRol = 3, T3.NombreTutor, '')) AS RecolectorNombreTutor,
//     MAX(IF(T1.IdTutorRol = 1, T1.PaternoTutor, '')) AS PapaPaternoTutor,
//     MAX(IF(T2.IdTutorRol = 2, T2.PaternoTutor, '')) AS MamaPaternoTutor,
//     MAX(IF(T3.IdTutorRol = 3, T3.PaternoTutor, '')) AS RecolectorPaternoTutor,
//      MAX(IF(T1.IdTutorRol = 1, T1.MaternoTutor, '')) AS PapaMaternoTutor,
//     MAX(IF(T2.IdTutorRol = 2, T2.MaternoTutor, '')) AS MamaMaternoTutor,
//     MAX(IF(T3.IdTutorRol = 3, T3.MaternoTutor, '')) AS RecolectorMaternoTutor,
//     MAX(IF(T1.IdTutorRol = 1, T1.FotoTutor, '')) AS PapaMaternoTutor,
//     MAX(IF(T2.IdTutorRol = 2, T2.FotoTutor, '')) AS MamaMaternoTutor,
//     MAX(IF(T3.IdTutorRol = 3, T3.FotoTutor, '')) AS RecolectorMaternoTutor
//     from tutor t1 inner join tutor t2 
//     on t1.idTutorRol = t2.IdTutorRol
//     INNER JOIN tutor t3
//   ON t2.idTutorRol = t3.idTutorRol
//     INNER JOIN Alumno A1
//     ON t3.IdAlumno = A1.IdAlumno
//     group by t1.idAlumno,
//      A1.Nombre,
//     A1.Paterno,
//     A1.Materno,
//     A1.IdEstado,
//     A1.CURP,
//     A1.Sexo,
//     A1.Nacimiento,
//     A1.IdJardin,
//     A1.Calle,
// 	A1.Numero,
// 	A1.IdColonia,
// 	A1.Municipio,
// 	A1.Postal,
//     A1.Status,
//     A1.Foto,
//     A1.Telefono,
//     A1.Correo,
//     A1.CreatedAt
    
}
