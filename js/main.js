const clientElement = document.getElementById("cliente");
const tipoDocumentoElement = document.getElementById("tipoDocumento");
const centroEmisorElement = document.getElementById("centroEmisor");
const numeroElement = document.getElementById("numero");
const cantidad1Element = document.getElementById("cantidad1");
const producto1Element = document.getElementById("producto1");
const precio1Element = document.getElementById("precio1");
const impuesto1Element = document.getElementById("impuesto1");
const subtotal1Element = document.getElementById("subtotal1");
const cantidad2Element = document.getElementById("cantidad2");
const producto2Element = document.getElementById("producto2");
const precio2Element = document.getElementById("precio2");
const impuesto2Element = document.getElementById("impuesto2");
const subtotal2Element = document.getElementById("subtotal2");
const cantidad3Element = document.getElementById("cantidad3");
const producto3Element = document.getElementById("producto3");
const precio3Element = document.getElementById("precio3");
const impuesto3Element = document.getElementById("impuesto3");
const subtotal3Element = document.getElementById("subtotal3");
const cantidad4Element = document.getElementById("cantidad4");
const producto4Element = document.getElementById("producto4");
const precio4Element = document.getElementById("precio4");
const impuesto4Element = document.getElementById("impuesto4");
const subtotal4Element = document.getElementById("subtotal4");
const cantidad5Element = document.getElementById("cantidad5");
const producto5Element = document.getElementById("producto5");
const precio5Element = document.getElementById("precio5");
const impuesto5Element = document.getElementById("impuesto5");
const subtotal5Element = document.getElementById("subtotal5");
const totalElement = document.getElementById("total");
const confirmarElement = document.getElementById("confirmar");
const documentoRowElement = document.getElementById("documentoRow");

let listaDocumentos = [];
let numeradorFactura = 0;
let numeradorNotaDeCredito = 0;
let numeradorNotaDeDebito = 0;
let iterador = true;

const calcularTotal = (listaDocumentoDetalle) => {
    let impuesto;
    let total = 0;

    listaDocumentoDetalle.forEach( (det) => {
        impuesto = 1 + det.producto.impuesto / 100;
        total += det.producto.precio * det.cantidad * impuesto;
    });
    return total;
}

class Producto{
    constructor (id, nombre, precio, impuesto){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.impuesto = impuesto;
    }
}

class Documento{
    constructor (cliente, tipo, centroEmisor, numero, listaDocumentoDetalle){
        this.cliente = cliente;
        this.tipo = tipo;
        this.centroEmisor = centroEmisor;
        this.numero = numero;
        this.listaDocumentoDetalle = listaDocumentoDetalle;
        this.total = calcularTotal(listaDocumentoDetalle);
    }

    mostrarDocumento(){
        let documentoStr;

        documentoStr = `${this.tipo}, centro emisor ${this.centroEmisor}, número ${this.numero}, para ${this.cliente} por un total de $${this.total}. `;
        return documentoStr;
    }

    mostrarMensajeDocumentoCreado(){
        let mensajeDocumento;

        mensajeDocumento = `Se creó correctamente la ${this.tipo}, centro emisor ${this.centroEmisor}, número ${this.numero}, para ${this.cliente} por un total de $${this.total}. La misma contiene los siguientes productos: `;
        this.listaDocumentoDetalle.forEach( (det) => {  mensajeDocumento += `\n${det.cantidad} x ${det.producto.nombre} con un precio de $${det.producto.precio} c/u y un ${det.producto.impuesto}% de impuestos.`;  });
        alert(mensajeDocumento);
    }
}

class DocumentoDetalle{
    constructor (producto, cantidad){
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

let productos = [new Producto(1, 'Microfono', 25000, 21), new Producto(2, 'Monitor', 80000, 0), new Producto(3, 'Mouse', 20000, 21), new Producto(4, 'Parlantes', 50000, 27), new Producto(5, 'Teclado', 30000, 0)];

const validarCliente = (msgError) => {
    let cliente = clientElement.value;

    if (cliente == '') msgError += 'Seleccione Cliente\n';  
    return msgError;
}

const validarTipoDocumento = (msgError) => {
    let tipoDocumento = tipoDocumentoElement.value;

    if(tipoDocumento == '' ) msgError += 'Seleccione Tipo de Documento\n';
    return msgError;
}

const validarCentroEmisor = (msgError) => {
    let centroEmisor = centroEmisorElement.value;

    if (centroEmisor == '') msgError += 'Seleccione Centro Emisor\n';
    return msgError;
}

const validarDetalle = (msgError) => {
    let cantidad1 = cantidad1Element.value;
    let producto1 = producto1Element.value;
    let cantidad2 = cantidad2Element.value;
    let producto2 = producto2Element.value;
    let cantidad3 = cantidad3Element.value;
    let producto3 = producto3Element.value;
    let cantidad4 = cantidad4Element.value;
    let producto4 = producto4Element.value;
    let cantidad5 = cantidad5Element.value;
    let producto5 = producto5Element.value;

    if (cantidad1 <= 0 && producto1 == "" && cantidad2 <= 0 && producto2 == "" && cantidad3 <= 0 && producto3 == "" && cantidad4 <= 0 && producto4 == "" && cantidad5 <= 0 && producto5 == "") return msgError += 'Ingrese alguna línea del detalle\n';
    if (cantidad1 <= 0 && producto1 != "") msgError += "Ingrese la cantidad en la primer línea del detalle\n";
    if (cantidad1 > 0 && producto1 == "") msgError += "Seleccione el producto en la primer línea del detalle\n";
    if (cantidad2 <= 0 && producto2 != "") msgError += "Ingrese la cantidad en la segunda línea del detalle\n";
    if (cantidad2 > 0 && producto2 == "") msgError += "Seleccione el producto en la segunda línea del detalle\n";
    if (cantidad3 <= 0 && producto3 != "") msgError += "Ingrese la cantidad en la tercer línea del detalle\n";
    if (cantidad3 > 0 && producto3 == "") msgError += "Seleccione el producto en la tercer línea del detalle\n";
    if (cantidad4 <= 0 && producto4 != "") msgError += "Ingrese la cantidad en la cuarta línea del detalle\n";
    if (cantidad4 > 0 && producto4 == "") msgError += "Seleccione el producto en la cuarta línea del detalle\n";
    if (cantidad5 <= 0 && producto5 != "") msgError += "Ingrese la cantidad en la quinta línea del detalle\n";
    if (cantidad5 > 0 && producto5 == "") msgError += "Seleccione el producto en la quinta línea del detalle\n";
    return msgError
}

const validarInputs = () => {
    let msgError = '';

    msgError = validarCliente(msgError);
    msgError = validarTipoDocumento(msgError);
    msgError = validarCentroEmisor(msgError);
    msgError = validarDetalle(msgError);
    return msgError;
}

const mostrarError = (msgError) => {
    alert(msgError);
}

const asignarNumero = (tipoDocumento, centroEmisor) => {
    let documentosFiltrados;
    let numero;
    let numeroStr = '00000000';
    let difLength = 0;

    documentosFiltrados = listaDocumentos.filter( (d) => d.tipo == tipoDocumento && d.centroEmisor == centroEmisor);    // Consigo los documentos del mismo tipo y centro emisor.
    if (documentosFiltrados.length == 0) return '00000001';
    documentosFiltrados.sort( (a,b) => b.numero - a.numero); // Ordeno los documentos filtrados de mayor a menor para obtener el más grande fácilmente.
    numero = parseInt(documentosFiltrados[0].numero) + 1;
    numeroStr += numero;
    difLength = numeroStr.length - 8;
    numeroStr = numeroStr.substring(difLength)
    return numeroStr;
}

const crearDetalle = () => {
    let cantidad1 = cantidad1Element.value;
    let producto1 = producto1Element.value;
    let documentoDetalle1;
    let cantidad2 = cantidad2Element.value;
    let producto2 = producto2Element.value;
    let documentoDetalle2;
    let cantidad3 = cantidad3Element.value;
    let producto3 = producto3Element.value;
    let documentoDetalle3;
    let cantidad4 = cantidad4Element.value;
    let producto4 = producto4Element.value;
    let documentoDetalle4;
    let cantidad5 = cantidad5Element.value;
    let producto5 = producto5Element.value; 
    let documentoDetalle5;
    let listaDocumentoDetalle = [];

    if (cantidad1 > 0 && producto1 != ""){
        documentoDetalle1 = new DocumentoDetalle(productos[producto1], cantidad1);
        listaDocumentoDetalle.push(documentoDetalle1);
    }
    if (cantidad2 > 0 && producto2 != ""){
        documentoDetalle2 = new DocumentoDetalle(productos[producto2], cantidad2);
        listaDocumentoDetalle.push(documentoDetalle2);
    }
    if (cantidad3 > 0 && producto3 != ""){
        documentoDetalle3 = new DocumentoDetalle(productos[producto3], cantidad3);
        listaDocumentoDetalle.push(documentoDetalle3);
    }
    if (cantidad4 > 0 && producto4 != ""){
        documentoDetalle4 = new DocumentoDetalle(productos[producto4], cantidad4);
        listaDocumentoDetalle.push(documentoDetalle4);
    }
    if (cantidad5 > 0 && producto5 != ""){
        documentoDetalle5 = new DocumentoDetalle(productos[producto5], cantidad5);
        listaDocumentoDetalle.push(documentoDetalle5);
    }
    return listaDocumentoDetalle;
}

const mostrarListadoDocumentos = () => {
    documentoRowElement.innerHTML = '';
    listaDocumentos.forEach( (doc) => { 
        documentoRowElement.innerHTML += `
            <div class="row">
                <div class="col-xl-2 offset-md-1">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.tipo}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.centroEmisor}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.numero}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.cliente}</p>
                    </div>
                </div>
                <div class="col-xl-2">
                    <div class="containerInput alignCenter">
                        <p class="textGeneric">${doc.total}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

const reinciarForm = () => {
    clientElement.value = '';
    tipoDocumentoElement.value = '';
    centroEmisorElement.value = '';
    numeroElement.innerHTML = '00000000';
    cantidad1Element.value = 0;
    producto1Element.value = '';
    precio1Element.innerHTML = 0;
    impuesto1Element.innerHTML = 0;
    subtotal1Element.innerHTML = 0;
    cantidad2Element.value = 0;
    producto2Element.value = '';
    precio2Element.innerHTML = 0;
    impuesto2Element.innerHTML = 0;
    subtotal2Element.innerHTML = 0;
    cantidad3Element.value = 0;
    producto3Element.value = '';
    precio3Element.innerHTML = 0;
    impuesto3Element.innerHTML = 0;
    subtotal3Element.innerHTML = 0;
    cantidad4Element.value = 0;
    producto4Element.value = '';
    precio4Element.innerHTML = 0;
    impuesto4Element.innerHTML = 0;
    subtotal4Element.innerHTML = 0;
    cantidad5Element.value = 0;
    producto5Element.value = '';
    precio5Element.innerHTML = 0;
    impuesto5Element.innerHTML = 0;
    subtotal5Element.innerHTML = 0;
    totalElement.innerHTML = 0;
}

const crearDocumento = () => {
    let cliente = clientElement.value;
    let tipoDocumento = tipoDocumentoElement.value;
    let centroEmisor = centroEmisorElement.value;
    let numero = numeroElement.innerHTML;
    let listaDocumentoDetalle = crearDetalle();
    let documento = new Documento(cliente, tipoDocumento, centroEmisor, numero, listaDocumentoDetalle);
    listaDocumentos.push(documento); 
    mostrarListadoDocumentos();
    reinciarForm(); 
}

const gestionarCreacionDocumento = () => {
    let msgError = '';

    msgError = validarInputs();
    msgError == ''? crearDocumento() : mostrarError(msgError);
}

const gestionarNumero = () => {
    let tipoDocumentoInput;
    let centroEmisorInput;
    let numero;

    tipoDocumentoInput = tipoDocumentoElement.value;
    centroEmisorInput = centroEmisorElement.value;
    
    if(tipoDocumentoInput != '' && centroEmisorInput != ''){
        numero = asignarNumero(tipoDocumentoInput, centroEmisorInput);   
        numeroElement.innerHTML = numero;
    } else {
        numeroElement.innerHTML = '00000000';
    }
}

const obtenerProducto = (id) => {
    let productosFiltrados;

    productosFiltrados = productos.filter( (p) => p.id == id);
    return productosFiltrados[0];
}

const gestionarLinea1 = () => {
    let cantidadInput;
    let productoInput;
    let subtotalInput;
    let totalInput;
    let total;
    let producto;

    cantidadInput = cantidad1Element.value;
    productoInput = producto1Element.value;
    subtotalInput = parseInt(subtotal1Element.innerHTML);
    totalInput = parseInt(totalElement.innerHTML);
    total = totalInput - subtotalInput;

    if(cantidadInput > 0 && productoInput != ''){
        producto = obtenerProducto(productoInput);
        precio1Element.innerHTML = producto.precio;
        impuesto1Element.innerHTML = producto.impuesto;
        subtotal1Element.innerHTML = cantidadInput * producto.precio * (1 + producto.impuesto / 100);
    } else {
        precio1Element.innerHTML = 0;
        impuesto1Element.innerHTML = 0;
        subtotal1Element.innerHTML = 0;
    }

    total += parseInt(subtotal1Element.innerHTML);
    totalElement.innerHTML = total;
}

const gestionarLinea2 = () => {
    let cantidadInput;
    let productoInput;
    let subtotalInput;
    let totalInput;
    let total;
    let producto;

    cantidadInput = cantidad2Element.value;
    productoInput = producto2Element.value;
    subtotalInput = parseInt(subtotal2Element.innerHTML);
    totalInput = parseInt(totalElement.innerHTML);
    total = totalInput - subtotalInput;
    
    if(cantidadInput > 0 && productoInput != ''){
        producto = obtenerProducto(productoInput);
        precio2Element.innerHTML = producto.precio;
        impuesto2Element.innerHTML = producto.impuesto;
        subtotal2Element.innerHTML = cantidadInput * producto.precio * (1 + producto.impuesto / 100);
    } else {
        precio2Element.innerHTML = 0;
        impuesto2Element.innerHTML = 0;
        subtotal2Element.innerHTML = 0;
    }

    total += parseInt(subtotal2Element.innerHTML);
    totalElement.innerHTML = total;
}

const gestionarLinea3 = () => {
    let cantidadInput;
    let productoInput;
    let subtotalInput;
    let totalInput;
    let total;
    let producto;

    cantidadInput = cantidad3Element.value;
    productoInput = producto3Element.value;
    subtotalInput = parseInt(subtotal3Element.innerHTML);
    totalInput = parseInt(totalElement.innerHTML);
    total = totalInput - subtotalInput;
    
    if(cantidadInput > 0 && productoInput != ''){
        producto = obtenerProducto(productoInput);
        precio3Element.innerHTML = producto.precio;
        impuesto3Element.innerHTML = producto.impuesto;
        subtotal3Element.innerHTML = cantidadInput * producto.precio * (1 + producto.impuesto / 100);
    } else {
        precio3Element.innerHTML = 0;
        impuesto3Element.innerHTML = 0;
        subtotal3Element.innerHTML = 0;
    }

    total += parseInt(subtotal3Element.innerHTML);
    totalElement.innerHTML = total;
}

const gestionarLinea4 = () => {
    let cantidadInput;
    let productoInput;
    let subtotalInput;
    let totalInput;
    let total;
    let producto;

    cantidadInput = cantidad4Element.value;
    productoInput = producto4Element.value;
    subtotalInput = parseInt(subtotal4Element.innerHTML);
    totalInput = parseInt(totalElement.innerHTML);
    total = totalInput - subtotalInput;
    
    if(cantidadInput > 0 && productoInput != ''){
        producto = obtenerProducto(productoInput);
        precio4Element.innerHTML = producto.precio;
        impuesto4Element.innerHTML = producto.impuesto;
        subtotal4Element.innerHTML = cantidadInput * producto.precio * (1 + producto.impuesto / 100);
    } else {
        precio4Element.innerHTML = 0;
        impuesto4Element.innerHTML = 0;
        subtotal4Element.innerHTML = 0;
    }

    total += parseInt(subtotal4Element.innerHTML);
    totalElement.innerHTML = total;
}

const gestionarLinea5 = () => {
    let cantidadInput;
    let productoInput;
    let subtotalInput;
    let totalInput;
    let total;
    let producto;

    cantidadInput = cantidad5Element.value;
    productoInput = producto5Element.value;
    subtotalInput = parseInt(subtotal5Element.innerHTML);
    totalInput = parseInt(totalElement.innerHTML);
    total = totalInput - subtotalInput;

    if(cantidadInput > 0 && productoInput != ''){
        producto = obtenerProducto(productoInput);
        precio5Element.innerHTML = producto.precio;
        impuesto5Element.innerHTML = producto.impuesto;
        subtotal5Element.innerHTML = cantidadInput * producto.precio * (1 + producto.impuesto / 100);
    } else {
        precio5Element.innerHTML = 0;
        impuesto5Element.innerHTML = 0;
        subtotal5Element.innerHTML = 0;
    }

    total += parseInt(subtotal5Element.innerHTML);
    totalElement.innerHTML = total;
}

confirmarElement.addEventListener("click", gestionarCreacionDocumento);
tipoDocumentoElement.addEventListener("change", gestionarNumero);
centroEmisorElement.addEventListener("change", gestionarNumero);
cantidad1Element.addEventListener("focusout", gestionarLinea1);
producto1Element.addEventListener("change", gestionarLinea1);
cantidad2Element.addEventListener("focusout", gestionarLinea2);
producto2Element.addEventListener("change", gestionarLinea2);
cantidad3Element.addEventListener("focusout", gestionarLinea3);
producto3Element.addEventListener("change", gestionarLinea3);
cantidad4Element.addEventListener("focusout", gestionarLinea4);
producto4Element.addEventListener("change", gestionarLinea4);
cantidad5Element.addEventListener("focusout", gestionarLinea5);
producto5Element.addEventListener("change", gestionarLinea5);