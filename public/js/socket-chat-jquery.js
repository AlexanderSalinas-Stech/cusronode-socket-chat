let param =new URLSearchParams(window.location.search);
let nombre=param.get('nombre');
let sala=param.get('sala');

//referencias jquery
let divUsuarios= $('#divUsuarios');
let formEnviar= $('#formEnviar');
let txtMensaje=$('#txtMensaje');
let divChatbox=$('#divChatbox');

//funciones renderizar usuarios

function renderizarUsuarios(personas=[]) {
    
   let html='';
   
   html+='<li>';
   html+=     `<a href="javascript:void(0)" class="active"> Chat de <span>${param.get('sala')}</span></a>`;
   html+='</li>';

   for (let i = 0; i < personas.length; i++) {
    html+=  `<li>
                <a data-id="${personas[i].id}" href="javascript:void(0)" class="active">
                    <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> 
                        <span>${personas[i].nombre}
                            <small class="text-success">online</small>
                        </span>
                </a>
            </li>`;
    html+='<li class="p-20"></li>';
   }

   divUsuarios.html(html);
   
}

function renderizarMensajes(mensaje,yo=false) {
   let html ='';
   let fecha =new Date(mensaje.fecha);
   let hora =fecha.getHours()+':'+fecha.getMinutes();
   let adminClass='info';

   if (mensaje.nombre==='Administrador') {
        adminClass='danger';
   }

   if (yo) {

        html+=`<li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
        </li>`;
   }else{
        html+='<li class="animated fadeIn">'
        if (mensaje.nombre!=='Administrador') {
            html+='<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html+=`<div class="chat-content">
            <h5>${mensaje.nombre}</h5>
            <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
        </div>
        <div class="chat-time">${hora}</div>
    </li>`;

   }
    
    

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    let newMessage = divChatbox.children('li:last-child');

    // heights
    let clientHeight = divChatbox.prop('clientHeight');
    let scrollTop = divChatbox.prop('scrollTop');
    let scrollHeight = divChatbox.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsuarios.on('click','a',function(){
    let id= $(this).data('id');
});

formEnviar.on('submit',function (e) {
    e.preventDefault();
    if (txtMensaje.val().trim().length ===0) {
        return;
    }


    socket.emit('crearMensaje', {
            nombre: nombre,
            mensaje: txtMensaje.val()
        },
        function(mensaje) {
           txtMensaje.val('').focus();
           console.log(mensaje);
           renderizarMensajes(mensaje,true);
           scrollBottom();
        }
    );
})
