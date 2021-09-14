//  Variables  y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');





// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
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