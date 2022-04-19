export interface AuthResponse {

        error: boolean,
        usuario: {
            id: number,
            rol_id: number,
            nombreRol: string,
            usuario: string,
            email: string,
        },
        token: string
        msg?:string

}
