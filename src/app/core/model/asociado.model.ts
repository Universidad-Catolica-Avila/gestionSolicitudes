export interface Asociado {
    id?: number;
    direccion?: string;
    localidad?: string;
    provincia?: string;
    codigoPostal?: number;
    cif?: string;
    observaciones?: string;
    telefono?: string;
    email?: string;
    codigoBanco?: string;
    codigoSucursal?: string;
    digitoControl?: string;
    cuenta?: string;
    descatalogado?: boolean;
    fechaAlta?: string;
    iban?: string;
    bic?: AsociadoBic;
    pais?: string;
    naturaleza?: AsociadoNaturaleza;
    codigoTipoSociedad?: TipoSociedad;
    codigoTipoCliente?: AsociadoTipoCliente;
    nombrefiscal?: string;
}

export interface AsociadoTipoCliente {
    id?: number;
    nombre?: string;
    descripcion?: string;
}

export interface AsociadoBic {
    codigoBanco?: number;
    bic?: string;
}

export interface TipoSociedad {
    id?: number;
    nombre?: string;
    descripcion?: string;
}

export interface AsociadoNaturaleza {
    id?: number;
    nombre?: string;
    descripcion?: string;
}
