// Declaración de variables para acceder a elementos del DOM
let mensajeError = document.getElementById("mensajeError");
let munecoElement = document.getElementById("muneco");
let textoInformativo1Element = document.getElementById("texto-informativo1");
let textoInformativo2Element = document.getElementById("texto-informativo2");
let resultadoElement = document.getElementById("resultado");
let botonCopiarElement = document.getElementById("copiar");

//Función de encriptado
let encriptar = () => {
    let textoMensaje = document.getElementById("mensaje").value;
    let resultado = "";
    //Validación (no se aceptan mayúsculas ni caracteres especiales). Se usa una expresión regular que solo admite minúsculas y espacios
    if ((/^[a-z ]+$/.test(textoMensaje))) {
        for (let index = 0; index < textoMensaje.length; index++) {
            let caracterActual = textoMensaje[index]
            // Reemplazo de vocales por código específico
            if (caracterActual == "e") {
                resultado += "enter"
            } else if (caracterActual == "i") {
                resultado += "imes"
            } else if (caracterActual == "a") {
                resultado += "ai"
            } else if (caracterActual == "o") {
                resultado += "ober"
            } else if (caracterActual == "u") {
                resultado += "ufat"
            } else {
                resultado += caracterActual;
            }
        }

        document.getElementById("resultado").value = resultado;
        resultadoElement.classList.remove('hidden');
        resultadoElement.classList.add('visible');
        munecoElement.classList.remove('visible');
        munecoElement.classList.add('hidden');
        textoInformativo1Element.classList.remove('visible');
        textoInformativo1Element.classList.add('hidden');
        textoInformativo2Element.classList.remove('visible');
        textoInformativo2Element.classList.add('hidden');
        botonCopiarElement.classList.remove('hidden');
        mensajeError.classList.add('hidden');
    } else {
        mensajeError.classList.remove('hidden');
        mensajeError.classList.add('visible');
    }

    return resultado
}

//Función desencriptado
let desencriptar = () => {
    let textoEncriptado = document.getElementById("mensaje").value;
    let resultado = "";

    if ((/^[a-z ]+$/.test(textoEncriptado))) {
        let i = 0;
        while (i < textoEncriptado.length) {
            let subcadena = textoEncriptado.substring(i);
            if (subcadena.startsWith("ai")) {
                resultado += "a";
                i += 2;
            } else if (subcadena.startsWith("enter")) {
                resultado += "e";
                i += 5;
            } else if (subcadena.startsWith("imes")) {
                resultado += "i";
                i += 4;
            } else if (subcadena.startsWith("ober")) {
                resultado += "o";
                i += 4;
            } else if (subcadena.startsWith("ufat")) {
                resultado += "u";
                i += 4;
            } else {
                resultado += textoEncriptado.charAt(i);
                i += 1;
            }
        }

        // Actualiza el DOM con el resultado
        resultadoElement.value = resultado;
        resultadoElement.classList.remove('hidden');
        resultadoElement.classList.add('visible');
        munecoElement.classList.remove('visible');
        munecoElement.classList.add('hidden');
        textoInformativo1Element.classList.remove('visible');
        textoInformativo1Element.classList.add('hidden');
        textoInformativo2Element.classList.remove('visible');
        textoInformativo2Element.classList.add('hidden');
        botonCopiarElement.classList.remove('hidden');
        mensajeError.classList.add('hidden');
    } else {
        // Muestra el mensaje de error si la entrada no es válida
        mensajeError.classList.remove('hidden');
        mensajeError.classList.add('visible');
    }

    return resultado;
}

//Copiar valores del campo de presentación de mensajes 
let copiarAlPortapapeles = async () => {
    let textoParaCopiar = document.getElementById("resultado").value;
    let mensajePortapapeles = document.getElementById("mensaje-portapapeles");
    try {
        await navigator.clipboard.writeText(textoParaCopiar);
        mensajePortapapeles.textContent = "Texto copiado al portapapeles";
        mensajePortapapeles.classList.remove('hidden');
        mensajePortapapeles.classList.add('visible'); // Mostrar mensaje de portapapeles
        setTimeout(() => {
            mensajePortapapeles.classList.add('hidden');
            mensajePortapapeles.classList.remove('visible'); // Ocultar mensaje de portapapeles
        }, 3000);
    } catch (error) {
        mensajePortapapeles.textContent = "No se pudo copiar el texto al portapapeles";
        mensajePortapapeles.classList.remove('hidden');
        mensajePortapapeles.classList.add('visible'); // Mostrar mensaje de portapapeles
        setTimeout(() => {
            mensajePortapapeles.classList.add('hidden');
            mensajePortapapeles.classList.remove('visible'); // Ocultar mensaje de portapapeles
        }, 3000);
    }
}

// Función para limpiar los campos de entrada y resultado
let limpiarCaja = () => {
    document.querySelector("#mensaje").value = "";
    document.querySelector("#resultado").value = "";

    resultadoElement.classList.add('hidden');
    resultadoElement.classList.remove('visible');

    munecoElement.classList.remove('hidden');
    munecoElement.classList.add('visible');

    textoInformativo1Element.classList.remove('hidden');
    textoInformativo1Element.classList.add('visible');

    textoInformativo2Element.classList.remove('hidden');
    textoInformativo2Element.classList.add('visible');

    botonCopiarElement.classList.add('hidden');
}

//Conecta la función a su respectivo botón de HTML
document.getElementById("encriptar").addEventListener("click", encriptar);
document.getElementById("desencriptar").addEventListener("click", desencriptar);
document.getElementById("copiar").addEventListener("click", copiarAlPortapapeles);
document.getElementById("limpiar").addEventListener("click", limpiarCaja);

// Configuración inicial cuando se carga el DOM
document.addEventListener('DOMContentLoaded', (event) => {
    // Oculta algunos elementos al cargar la página
    let botonCopiarElement = document.getElementById("copiar");
    botonCopiarElement.classList.add('hidden');

    mensajeError.classList.add('hidden');
    resultadoElement.classList.add('hidden');
});
