CREATE SCHEMA sProspectos
go

create table sProspectos.Ctl_Documentos(
Id int primary key not null identity (1,1),
Descripcion varchar(50) not null,
Activo bit not null default 1
)

go
create table sProspectos.Ctl_EstatusSolicitud(
Id int primary key not null identity(1,1),
Descripcion varchar(100) not null,
Activo bit not null default 1,
FechaRegistro datetime not null default getdate()
)
go

insert  sProspectos.Ctl_EstatusSolicitud(Descripcion)
values ('Enviado'), ('Autorizado'), ('Rechazado')

go

create type sProspectos.Typ_ArchivosSolicitud as table(
idSolicitud int not null,
idArchivo int not null,
datos varbinary(max) not null
)

go
create table sProspectos.Solicitudes(
Id int primary key not null identity (1,1),
Nombre varchar(50) not null,
ApellidoPaterno varchar(50) not null,
ApellidoMaterno varchar(50) null,
Calle varchar(100) not null,
NumeroExterior nvarchar(5) not null,
NumeroInterior nvarchar(10) null,
Colonia varchar(50) not null,
CodigoPostal nchar(5) not null,
Telefono nchar(10) not null,
Rfc varchar(13) not null,
FechaRegistro datetime not null default getdate(),
EstatusSolicitud int not null foreign key references sProspectos.Ctl_EstatusSolicitud(Id),
Observaciones varchar(255) null
)

go
create table sProspectos.Archivos_Prospectos(
Id Bigint primary key not null identity(1,1),
IdTipoDocumento int not null foreign key references sProspectos.Ctl_Documentos(Id),
Datos varbinary(max) not null,
IdSolicitud int not null foreign key references sProspectos.Solicitudes(Id),
FechaRegistro datetime not null default getdate(),
Activo bit not null default 1
)

go

create proc sProspectos.SP_Solicitudes_Get
@prtIdSolicitud int = null

as
 begin
 select s.Id, s.Nombre, s.ApellidoPaterno, s.ApellidoMaterno, s.Calle,
		s.NumeroExterior, s.NumeroInterior, s.Colonia, s.CodigoPostal,
		s.Telefono, s.Rfc, ss.Descripcion as EstatusProspecto
 from sProspectos.Solicitudes s (nolock)
	inner join sProspectos.Ctl_EstatusSolicitud ss (nolock) on ss.Id = s.EstatusSolicitud and ss.Activo = 1
 where @prtIdSolicitud is null or (@prtIdSolicitud is not null and s.Id = @prtIdSolicitud)

end--proc

go

create proc sProspectos.SP_Solicitudes_Set
@prtNombre varchar(50),
@prtApellidoPaterno varchar(50),
@prtApellidoMaterno varchar(50) = null,
@prtCalle varchar(100),
@prtNumeroInterior nvarchar(10) = null,
@prtNumeroExterior char(5),
@prtColonia varchar(50),
@prtCodigoPostal nchar(5),
@prtTelefono nchar(10),
@prtRFC varchar(13),
@type_Documentos_Solicitud sProspectos.Typ_ArchivosSolicitud readonly,
@prtErrNumber int output,
@prtErrDescrip varchar(255) output
as
begin

declare @s varchar(max)
declare @Estatus_Solicitud_Pendiente int = 1

begin try

 if not exists (select 1 from @type_Documentos_Solicitud)
 begin
  set @s = 'Suba por lo menos 1 archivo para continuar'
  raiserror(@s,16,10)
 end--if

 if exists (select 1 from sProspectos.Archivos_Prospectos ap (nolock)
			left join @type_Documentos_Solicitud t on t.idSolicitud = ap.IdSolicitud and t.idSolicitud is null
			where ap.Activo = 1)
 begin

	delete p
	from sProspectos.Archivos_Prospectos p
	 inner join @type_Documentos_Solicitud s on s.idSolicitud = p.IdSolicitud and s.idSolicitud is null
		 
 end--if

 begin tran

 insert sProspectos.Solicitudes (Nombre, ApellidoPaterno, ApellidoMaterno, Calle, NumeroExterior, NumeroInterior, Colonia,
								 CodigoPostal, Telefono, Rfc, EstatusSolicitud)
 values (@prtNombre, @prtApellidoPaterno, @prtApellidoMaterno, @prtCalle, @prtNumeroExterior, @prtNumeroInterior, @prtColonia,
		 @prtCodigoPostal, @prtTelefono, @prtRFC, @Estatus_Solicitud_Pendiente)


 insert sProspectos.Archivos_Prospectos (IdSolicitud, IdTipoDocumento, Datos)
 select tp.idSolicitud, tp.idArchivo, tp.datos 
 from @type_Documentos_Solicitud tp

 commit tran

 set @prtErrNumber = 0
 set @prtErrDescrip = 'Prospecto guardado con éxito.'

end try
begin catch

 if @@TRANCOUNT > 0
 begin

	rollback tran
 end--if

 set @prtErrNumber = -1
 set @prtErrDescrip = ERROR_MESSAGE()
end catch
end--proc


select * from sProspectos.Ctl_Documentos

select * from sProspectos.Ctl_EstatusSolicitud