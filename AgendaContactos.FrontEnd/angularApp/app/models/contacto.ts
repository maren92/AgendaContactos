import { Telefono } from "./telefono";
import { GrupoContactos } from "./grupoContactos";

export class Contacto {
    public id: number;
    public nombreApe: string;
    public correo: string;
    public alias: string;
    public direccion: string;
    public telefonos: Telefono[];
    public grupoContactos: GrupoContactos[];
}