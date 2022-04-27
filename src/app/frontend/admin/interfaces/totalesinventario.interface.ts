/*export interface MenuResponse {

    id: number,
    nombre: string,
    ruta: string,
    icono: string,
    orden: number,
    created_at: string,
    arrSubmenu: {
        created_at: string,
        id: number,
        menu_id: number,
        nombre: string,
        orden: number,
        ruta: string,
    }
}


export interface Almacen {

    clave: string,
    nombre:string,
    estatus:number
}*/

// To parse this data:
//
//   import { Convert, TotalesInventario } from "./file";
//
//   const totalesInventario = Convert.toTotalesInventario(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
export interface TotalesInventario {
    error:           boolean;
    data:            { [key: string]: number };
    total:           { [key: string]: number };
    productoTotales: ProductoTotale[];
}

export interface ProductoTotale {
    id:                number;
    clave:             string;
    totalEnInventario: number;
}
