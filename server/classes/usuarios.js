class Usuarios{
    constructor(){
        this.personas=[];
    }

    agregarPersona(id,nombre,sala){
        let persona={id,nombre,sala};

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id){
        let persona= this.personas.filter(persona=> persona.id=id)[0];
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPeronasPorSala(sala){
        let personasEnSala=this.personas.filter(persona=>persona.sala=sala);
        return personasEnSala;
    }

    borrarPersona(id){

        let personaBorrada=this.getPersona(id);

        borrarItemDesdeArr(this.personas, personaBorrada);

        // this.personas.filter(persona=>persona.id !=id);

        return personaBorrada;
    }
}

function borrarItemDesdeArr ( arr, item ) {
    let i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}

module.exports={
    Usuarios
}