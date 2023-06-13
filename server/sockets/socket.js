
const { Usuarios } = require('../classes/usuarios');
const { io } = require('../server');
const crearMensaje = require('../utils/utilidades');

const usuarios= new Usuarios;


io.on('connection', (client) => {

    client.on('entrarChat',(usuario,callback)=>{
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                error:true,
                mensaje:'El nombre|Sala es necesario'
            });
        }

        client.join(usuario.sala);

        usuarios.agregarPersona(client.id,usuario.nombre,usuario.sala);

        client.broadcast.to(usuario.sala).emit('listaPersonas',usuarios.getPeronasPorSala(usuario.sala));
        callback(usuarios.getPeronasPorSala(usuario.sala));
    });
    
    client.on('disconnect',()=>{
       
        let personaBorrada= usuarios.borrarPersona(client.id);
        

        client.broadcast.emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada} Abandono el Chat`));

        client.broadcast.emit('listaPersonas',usuarios.getPersonas());
    });

    client.on('crearMensaje',(data)=>{
        let mensaje= crearMensaje(data.nombre,data.mensaje);

        client.broadcast.emit('crearMensaje',mensaje);
    });


    client.on('mensajePrivado', data=>{
        let persona=usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado'),crearMensaje(persona.nombre, data.mensaje);
    });
});