//constructor de data
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

//prototype 
Seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 5000;


    switch(this.marca){
        case '1':
            cantidad = base * 1.35;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    

    const diferencia = new Date().getFullYear() - this.anio;
    
    cantidad -= ((diferencia * 3 ) * cantidad  ) / 100;
    

    /*
    si el seguro es basico se multiplica por 30% ma si el seguro es completo por 50%    
    */
    
    
    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
}


    

//




//interfaz 
function Interfaz(){}



//mensaje a imprimir en el HTML
Interfaz.prototype.mostrarMensaje = function(mensaje, tipo){
    const div =  document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('mensaje', 'error');
    }else{
        div.classList.add('mensaje', 'correcto') ;
    }   
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function(){
        document.querySelector('.mensaje').remove();
    }, 3000);
}

//Imprimir el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function(seguro,total){
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;  
    }
    //
    const div = document.createElement('div');
    div.innerHTML = `
        <p class='header'>Tu Resumen </p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio} </p>        
        <p>Tipo: ${seguro.tipo}  </p>
        <p>Total: ${total} </p>
    `;
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block'
    setTimeout(function()  {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 300);
    
}




//eventListener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //lee el valor de la marca
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //lee el valor del anio 
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    
    //leer el selected 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    //console.log(tipo);

    //Crear instancia de interfaz

    const interfaz = new Interfaz();
    
    
    // validacion que campos no esten vacios o que el año seleccionado


    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '' ) {
        interfaz.mostrarError('Faltan Datos', 'correcto');
    }else {
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //prototype cotizar seguro
        const cantidad = seguro.cotizarSeguro();
        
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando', 'exito');
        

    }
    
    
    
    
    
});


const max = new Date().getFullYear(),
    min = max - 22;

const selectAnios = document.getElementById('anio');

for(let i = max; i > min;i-- ){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}

    