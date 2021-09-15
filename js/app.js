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

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];


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
    
            agregarGastosListado(gastos) {
                // console.log(gastos)

                // Iterar sobre los gastos

                this.limpiarHTML(); // Elimina el HTML previo....

                gastos.forEach(gasto => {

                    const {cantidad, nombre , id } = gasto;

                    // Crear un Li
                    const nuevogasto = document.createElement('li');
                    nuevogasto.className = 'list-group-item d-flex justify-content-between align-center';
                    
                    // en versiones anteriores de javascript se utiliza esto
                    // nuevogasto.setAttribute('data-id', id);

                    // en neuvas versiones se utiliza esto...
                    // esta agrega el data-id y le asigna el valor de id
                    nuevogasto.dataset.id = id;

                    // Agreagar el HTML al gasto

                    nuevogasto.innerHTML = `
                        ${nombre} <span class="badge badge-primary  badge-pill">${cantidad} </span>


                    `;

                    // Boton para borrar el gasto
                    const btnBorrar = document.createElement('button');
                    btnBorrar.classList.add('btn', 'btn-danger' , 'borrar-gasto');
                    btnBorrar.innerHTML = 'Borrar &times';
                    nuevogasto.appendChild(btnBorrar);


                    //Agregar al HTML
                    gastoListado.appendChild(nuevogasto);




                });

            }


            limpiarHTML(){
                while(gastoListado.firstChild){
                    gastoListado.removeChild(gastoListado.firstChild);
                }
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
    // console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);

}




// Anade gastos

function agregarGasto(e) {
    e.preventDefault();


    // Leer los datos del Formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number( document.querySelector('#cantidad').value);



    // Validar
    if(nombre === '' || cantidad ===''){
        // console.log('ambos campos son obligatorios');
        ui.imprimirAlertar('Ambos Campos son Obligatorios', 'error');
        return;
    } else if (cantidad <= 0) {
        ui.imprimirAlertar('Cantidad no Valida' , 'error');
        return;

    }

    // Generar un objeto con el gasto
    // Esto se conoce como Object Literal Enjagemente
    const gasto = { nombre, cantidad, id: Date.now()};

    // Anade nuevo gasto
    presupuesto.nuevoGasto(gasto);

    // Mensaje de todo bien
    ui.imprimirAlertar('Gasto Agregadp correctamente!!');


    // Implimir los gastos
    const { gastos } = presupuesto;
    ui.agregarGastosListado(gastos)


    // Reiniciar Formulario
    formulario.reset();

}
