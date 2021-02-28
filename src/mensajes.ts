import fs from 'fs'

async function leerMensajesAlmacenados(){
    try {
        const contenido = await fs.promises.readFile(__dirname + '/mensajes.txt', 'utf-8')
        const msjesAlmacenados = JSON.parse(contenido)
        return msjesAlmacenados
    }
    catch (error) {
        console.log(error)
    }
} 

async function guardarMensaje(mensaje:Mensaje){
    try {
        const contenido = await fs.promises.readFile(__dirname + '/mensajes.txt', 'utf-8')
        const msjesAlmacenados = JSON.parse(contenido)
        msjesAlmacenados.push(mensaje);
        const updatedMsjes = JSON.stringify(msjesAlmacenados)
        await fs.promises.writeFile(__dirname + '/mensajes.txt', updatedMsjes)
        return mensaje
    }
    catch (error) {
        console.log(error)
    }
}

interface Mensaje{
    email: String,
    mensaje: String,
    time: String,
}

class Mensaje implements Mensaje {
    email: String
    mensaje: String
    time: String

    constructor(email:String, mensaje:String, time: String){
        this.email = email;
        this.mensaje = mensaje;
        this.time = time;
    }   
}

class Mensajes{
    mensajes: Array<Mensaje>;

    constructor(mensajes:Array<Mensaje>){
        this.mensajes = mensajes;
    }

    async getAllMensajes(){
        this.mensajes = await leerMensajesAlmacenados();
        if(this.mensajes === null || this.mensajes === []){
            return {error : 'No hay mensajes'}
        }
        return this.mensajes;
    }

    async addMensaje(mensaje:Mensaje){
        this.mensajes = [... this.mensajes, mensaje];
        await guardarMensaje(mensaje)
        return mensaje;
    }
}

export const mensajes = new Mensajes([]);