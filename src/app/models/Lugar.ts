export class Lugar {
    foto: string;
    id: string;
    nombre: string;
    puntuacion: number;
    tipo: string;

    constructor(foto: string, id: string, nombre: string, puntuacion: number, tipo: string ) {
        this.foto = foto;
        this.id = id;
        this.nombre = nombre;
        this.puntuacion = puntuacion;
        this.tipo = tipo;
    }


}
