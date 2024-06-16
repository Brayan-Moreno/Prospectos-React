CREATE SCHEMA sProspectos
go

create table sProspectos.Ctl_Documentos(
Id int primary key not null identity (1,1),
Descripcion varchar(50) not null,
Extension varchar(50) not null,
Activo bit not null default 1
)

go

insert sProspectos.Ctl_Documentos(Descripcion,Extension)
values ('Pdf', 'application/pdf'), ('Jpeg', 'image/jpeg'), ('Png','image/png')

go

create proc sProspectos.SP_CtlDocumentos_Get
as
begin

	select d.Id, d.Descripcion, d.Extension 
	from sProspectos.Ctl_Documentos d (nolock)
	where d.Activo = 1
		
end--proc

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


create proc sProspectos.SP_CtlEstatus_Get
as
begin

	select e.Id, e.Descripcion
	from 
	sProspectos.Ctl_EstatusSolicitud e (nolock)
	where e.Activo = 1

end--proc

go

create type sProspectos.Typ_ArchivosSolicitud as table(
idSolicitud int not null,
idArchivo int not null,
nombreArchivo varchar(100) not null,
datos varchar(max) not null
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

--drop table sProspectos.Solicitudes
go
create table sProspectos.Archivos_Prospectos(
Id Bigint primary key not null identity(1,1),
IdTipoDocumento int not null foreign key references sProspectos.Ctl_Documentos(Id),
NombreArchivo varchar(100) not null,
Datos varchar(max) not null,
IdSolicitud int not null foreign key references sProspectos.Solicitudes(Id),
FechaRegistro datetime not null default getdate(),
Activo bit not null default 1
)

go

--drop table sProspectos.Archivos_Prospectos

alter proc sProspectos.SP_Solicitudes_Get
@prtIdSolicitud int = null

as
 begin
 select s.Id, s.Nombre, s.ApellidoPaterno, s.ApellidoMaterno, s.Calle,
		s.NumeroExterior, s.NumeroInterior, s.Colonia, s.CodigoPostal,
		s.Telefono, s.Rfc, ss.id as IdEstatusProspecto, ss.Descripcion as EstatusProspecto,
		s.Observaciones
 from sProspectos.Solicitudes s (nolock)
	inner join sProspectos.Ctl_EstatusSolicitud ss (nolock) on ss.Id = s.EstatusSolicitud and ss.Activo = 1
 where @prtIdSolicitud is null or (@prtIdSolicitud is not null and s.Id = @prtIdSolicitud)

end--proc

go

alter proc sProspectos.SP_Solicitudes_Set
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
@prtErrNumber int output,
@prtErrDescrip varchar(255) output
as
begin

declare @s varchar(max)
declare @Estatus_Solicitud_Pendiente int = 1
declare @IdProspecto int = 0

begin try

--<Validaciones>

 if exists(select 1 from sProspectos.Solicitudes s (nolock)
			where s.Nombre = @prtNombre and s.ApellidoPaterno = @prtApellidoPaterno
			and s.ApellidoMaterno = @prtApellidoMaterno)
 begin

	set @s = 'Ya se encuentra un registro de este prospecto, verifique e intente de nuevo.'
	raiserror(@s,16,10)
 end--if

--</Validaciones>
 
 begin tran

 insert sProspectos.Solicitudes (Nombre, ApellidoPaterno, ApellidoMaterno, Calle, NumeroExterior, NumeroInterior, Colonia,
								 CodigoPostal, Telefono, Rfc, EstatusSolicitud)
 values (@prtNombre, @prtApellidoPaterno, @prtApellidoMaterno, @prtCalle, @prtNumeroExterior, @prtNumeroInterior, @prtColonia,
		 @prtCodigoPostal, @prtTelefono, @prtRFC, @Estatus_Solicitud_Pendiente)
		 
 
 commit tran
 set @IdProspecto = SCOPE_IDENTITY()

 set @prtErrNumber = @IdProspecto
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

go
create proc sProspectos.SP_ArchivosProspecto_Set
@prtIdProspecto int,
@type_Documentos_Solicitud sProspectos.Typ_ArchivosSolicitud readonly,
@prtErrNumber int output,
@prtErrDescrip varchar(255) output
as
begin


declare @s varchar(255)
begin try

 if not exists (select 1 from @type_Documentos_Solicitud)
  begin
   set @s = 'Suba por lo menos 1 archivo para continuar'
   raiserror(@s,16,10)
  end--if


  begin tran

   if exists (select 1 from sProspectos.Archivos_Prospectos ap (nolock)
			 left join @type_Documentos_Solicitud t on t.idSolicitud = ap.IdSolicitud and t.idSolicitud is null
			  where ap.Activo = 1)
	 begin

	  delete p
	  from sProspectos.Archivos_Prospectos p
	    inner join @type_Documentos_Solicitud s on s.idSolicitud = p.IdSolicitud and s.idSolicitud is null
		 
   end--if

   insert sProspectos.Archivos_Prospectos (IdSolicitud, IdTipoDocumento, NombreArchivo,  Datos)
   select tp.idSolicitud, tp.idArchivo, tp.nombreArchivo, tp.datos 
   from @type_Documentos_Solicitud tp

 commit tran

 set @prtErrNumber = 0
 set @prtErrDescrip = 'Documentos guardados con éxito.'


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

go

alter proc sProspectos.SP_ArchivosProspecto_Get
@prtIdProspecto int
as
begin

 select ap.Id, ap.IdSolicitud as ProspectoId, ctl.Id as IdTipoArchivo, ap.NombreArchivo, ctl.Extension as TipoArchivo,
 ap.Datos
 from 
 sProspectos.Archivos_Prospectos ap (nolock)
	inner join sProspectos.Ctl_Documentos ctl (nolock) on ctl.Id = ap.IdTipoDocumento and ap.Activo = 1
 where ap.IdSolicitud = @prtIdProspecto

end--proc

go

alter proc sProspectos.SP_EstatusProspecto_Set
@prtIdProspecto int,
@prtIdStatus int,
@prtObservaciones varchar(255) = null,
@prtErrNumber int output,
@prtErrDescrip varchar(255) output
as
begin

begin try


begin tran

 update s set 
 s.EstatusSolicitud = @prtIdStatus,
 s.Observaciones =  @prtObservaciones
 from sProspectos.Solicitudes s
 where s.Id = @prtIdProspecto

 set @prtErrNumber = 0
 set @prtErrDescrip = 'Prospecto actualizado con éxito'

commit tran

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
select * from sProspectos.Solicitudes

select * from sProspectos.Archivos_Prospectos

