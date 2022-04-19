export interface MenuResponse {

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
}
