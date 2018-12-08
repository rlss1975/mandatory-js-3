'use strict';



/*****************DOM***********************
// El contenido HTML del elemento con id "contenido"
console.log(document.getElementById("contenido").innerHTML);
//
var h = document.head; // La variable h contiene el objeto head del DOM
console.log(h);

var b = document.body; // La variable b contiene el objeto body del DOM
console.log(b);
// Modificación del contenido HTML de la lista
//
document.getElementById("lenguajes").innerHTML += '<li id="c">C</li>';
*/
/*
// Supresión del contenido HTML de la lista
document.getElementById("lenguajes").innerHTML = '';
*/
// El atributo href del primer enlace
//console.log(document.querySelector("a").getAttribute("href"));

/*************************

1. cargamos lista con request asincrono automatico.y evento load.

2. los elementos que carguemos y rendericemos, les daremos clase 
para que se conviertan en eventos click.
3. en este punto el boton/evento debe tener en sun callbak un get request sobre el 
random que le pertoque.(carga de url corecta).Haremis request a traves de eventos.


3.cuando pulsemos click sobre raza , renderizaremos nueva lista de 
subraza por si existe.Lo haremos tambien a traves de evento/callbak.
aqui en la logica desde el objeto clikado cargaremos el array y miraremos si tiene valores.
si los tiene renderizaremos botones que carguen clase para potencilaes eventos.

---y aqui ya solo cargaremos sobre el boton de imagen la url random para esa raza--

En paralelo,
