export interface Alumno {
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
}