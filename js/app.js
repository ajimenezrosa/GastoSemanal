//  Variables  y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');





// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// Clases
class Presupuesto {

    constructor(presupuesto) {
        this.presupuesto =  Number(presupuesto); 
        this.restante = Number(presupuesto);
        this.gastos    = [];
    }

}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo el Valor
        const { presupuesto , restante } = cantidad;
        // Agrengado el valor a HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlertar(mensaje, tipo) {
        // crear el div

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        // Insertar en el html
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar el html
        setTimeout( () =>{
           divMensaje.remove();
        },2000)

    }
}
// Instanciar
const ui = new UI();



let presupuesto;


// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('Cual es tu Presupuesto?');

    // console.log(parseFloat(presupuestoUsuario) );

    if(presupuestoUsuario =='' || preguntarPresupuesto === null || isNaN(presupuestoUsuario) || preguntarPresupuesto <= 1 ){
        window.location.reload();
    } 

    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);

}




// Anade gastos

function agregarGasto(e) {
    e.preventDefault();


    // Leer los datos del Formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;



    // Validar
    if(nombre === '' || cantidad ===''){
        // console.log('ambos campos son obligatorios');
        ui.imprimirAlertar('Ambos Campos son Obligatorios', 'error');
        return;
    } else if (cantidad <= 0) {
        ui.imprimirAlertar('Cantidad no Valida' , 'error');
        return;

    }

    console.log('Agregando Gastos');
}