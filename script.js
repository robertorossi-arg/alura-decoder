//Acceso a elementos de HTML
var input_texto = document.querySelector("#input-texto");
var output_texto = document.querySelector("#msg");
var boton_encriptar = document.querySelector("#btn-encriptar");
var boton_desencriptar = document.querySelector("#btn-desencriptar");
var boton_copiar = document.querySelector("#btn-copy");

//Asignar funciones a los botones
boton_encriptar.onclick=encriptarTexto;
boton_desencriptar.onclick=desencriptarTexto;
boton_copiar.onclick=copiarPortapapeles;

const reglasCrypt = ["e", "i", "a", "o", "u"];
const reglasDecrypt = ["enter", "imes", "ai", "ober", "ufat"];

function encriptarTexto(){
  var texto = input_texto.value;

  // Si el el texto es valido -> encriptarlo
  if(textoValido(texto)) {
    output_texto.value = crypt(texto);
  } else {
    alert("Texto inválido");
    input_texto.select();
    input_texto.focus();
    output_texto.value = "";
  }
}

function desencriptarTexto(){
  var texto = input_texto.value;
  output_texto.value = decrypt(texto);
}

function textoValido(texto) {
  //No se admiten mayùsculas ni letras acentuadas
  var regexp = new RegExp("[A-ZáéíóúàèìòùâêîôûÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛ]");
  return !regexp.test(texto);
}

function crypt(texto) {
  var resultado = "";

  //recorrer todos los caracteres y encriptarlos
  for( var i=0; i<texto.length; i++) {
    resultado += cryptChar(texto[i]);
  }
  return resultado;
}

function cryptChar(caracter) {
  var retorno = caracter;
  // Encripta caracter si lo encuentra en reglasCrypt
  for( var i=0; i<reglasCrypt.length; i++){
    if( caracter == reglasCrypt[i]) {
      retorno = reglasDecrypt[i];
    }
  }
  return retorno;
}

function decrypt(texto) {
  var resultado = "";
  var match = false;

  //Recorre texto de una letra a la vez, buscando palabras de reglasDecrypt[]
  for( var i=0; i<texto.length; i++){
    for( var j=0; j<reglasDecrypt.length; j++ ) {
      // Si encuentra la palabre en reglasDecrypt[] la reenmplaza
      if( texto.substr(i, reglasDecrypt[j].length) == reglasDecrypt[j] ) {
        resultado += reglasCrypt[j];
        // Incrementar i salteando la longitud de la palabra y sale del
        // for interno
        i += reglasDecrypt[j].length-1;
        match = true;
        break;
      }
    }
    if( match ) {
      // Si encontró la palabra, resetea match para comenzar otra busqueda
      match = false;
    } else {
      // sino copia el caracter original en el resultado
      resultado += texto[i];
    }
  }
  return resultado;
}

// variante similar a decrypt
function crypt1(texto) {
  var resultado = "";
  var match = false;
  for( var i=0; i<texto.length; i++){
    for( var j=0; j<reglasCrypt.length; j++ ) {
      if( texto.substr(i, reglasCrypt[j].length) == reglasCrypt[j] ) {
        resultado += reglasDecrypt[j];
        i += reglasCrypt[j].length-1;
        match = true;
        break;
      }
    }
    if( match ) {
      match = false;
    } else {
      resultado += texto[i];
    }
  }
  return resultado;
}

function copiarPortapapeles(){
  output_texto.select();
  document.execCommand("copy");
}
