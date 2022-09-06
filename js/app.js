// Constructores

function Seguro( marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realiza la cotizacion de los datos

Seguro.prototype.cotizarSeguro = function(){
    /*
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo  1.35
    */

    let cantidad;
    const base = 2000;


    switch(this.marca){

        case '1':
            cantidad = base * 1.15;
        break;

        case '2':
        cantidad = base * 1.05;
        break;

        case '3':
        cantidad = base * 1.35;
        break;

        default:
        break;

        
    }

    console.log(cantidad);

    // Leer el a;o
    const diferencia = new Date().getFullYear() - this.year;

    //cada a;o que la diferencia es mayor, el costo va a reducirse un 3%
     cantidad -= ((diferencia * 3) * cantidad ) / 100;
    
    /* 
    Si el seguro es basico se multiplica el total por  un 30% mas
    Si el seguro es  completo se multiplica por un 50% mas
    */

    if( this.tipo === 'basico'){
        cantidad *= 1.30;
    } else{
        cantidad *= 1.50;
    }


   return cantidad;
}

function UI() {}

//Llena las opciones de los a;os
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max - 20;

    const selectYear = document.querySelector( '#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// Mostrar alertas en pantalla

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{ 

    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add( 'error');
    } else{
        div.classList.add( 'correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;


    //insertar en el HTML
const formulario = document.querySelector('#cotizar-seguro');
formulario.insertBefore(div, document.querySelector('#resultado'));


setTimeout(() =>{
    div.remove();

}, 3000);

}

UI.prototype.mostrarResultado = (total, seguro ) =>{
    
    const {marca, year, tipo} = seguro; 

    let textoMarca;

    switch(marca){
        case '1':
        textoMarca = 'Americano'

        break;

        case '2':
        textoMarca = 'Asiatico'
         break;

        case '3':
        textoMarca = 'Europeo'
        break;
                    default:
                        break;
    }


    //Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10'); 

    div.innerHTML =`
    <p class="header"> Tu Resumen </p>
    <p class="font-bold"> Marca: <span class="font-normal"> ${textoMarca} </span></p>
    <p class="font-bold"> Año: <span class="font-normal">  ${year} </span></p>
    <p class="font-bold"> Tipo:  ${tipo} </span></p>
    <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    resultadoDiv.appendChild(div);  
    


    // Mostrar el Spinner
    const spinner  = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(()=>{
 
 spinner.style.display = 'none';
 resultadoDiv.appendChild(div); // se muestra resulatado
    }, 3000);

}


// Instanciar UI

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones(); // llenar select con los a;os
})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // leer la marca seleccionada

    const marca = document.querySelector('#marca').value;

  // leer el a;o

    const year = document.querySelector('#year').value;


  // Leer  el tipo de coBertura
    const tipo = document.querySelector('input[name = "tipo"]:checked ').value;

    if(marca === '' || year === '' || tipo === '' ){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return; 
    } 

    ui.mostrarMensaje('Cotizando...', 'exito');


    // Ocultar las cotizaciones previas 
    const resultados =  document.querySelector('#resultado div');
     if(resultados != null ){
        resultados.remove();
     }



// instanciar el seguro 
        const seguro = new Seguro(marca, year, tipo);
        const total  = seguro.cotizarSeguro();
 

// Utilizar protoype que va a cotizar

    ui.mostrarResultado(total, seguro);




}