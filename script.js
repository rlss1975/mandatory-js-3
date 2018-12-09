'use strict';

//esta ruta me devolvera una imagen random
//sobre todas las razas
//cargaremos sobre imagen y su url/src
//https://dog.ceo/api/breeds/list/all
//https://dog.ceo/api/breeds/image/random
//
//main column 1 i main /index.html
let vBreedUL = document.querySelector('#breed')
//main column 2
let vSubBreedUL = document.querySelector('#subBreed')
//main column 3

let vHundTitle = document.querySelector('#hundTitle');
let vHundImg = document.querySelector('#hundBild')
let vButton = document.querySelector('#knapp');
let vButtonUrl;
let allBreedAllRandomImages = 'https://dog.ceo/api/breeds/image/random';

// esta array sobre raza
//https://dog.ceo/api/breed/hound/images
//https://dog.ceo/api/breed/${mi variable de perro}/images
//
//
//https://dog.ceo/api/breed/hound/afghan/images
//https://dog.ceo/api/breed/${breed}/${sub-breed}/images
//imagen random sub-breed
//https://dog.ceo/api/breed/hound/afghan/images/random

function ajaxGet (url,myFunction){
	let req = new XMLHttpRequest();
	req.open("GET",url,true);
	req.addEventListener("load",()=>{
		if (req.status >= 200 && req.status < 400) {
			console.log(req.responseText);
			myFunction(req.responseText);
		}else{
			console.log(req.status +" "+ req.statusText);
		}
	});
	req.addEventListener("error",()=>{console.log("request ankom inte till server");});
	req.send(null);
};

//
let allBreedList = 'https://dog.ceo/api/breeds/list/all';
/*
ajaxGet(allBreedList);
//

ajaxGet(allBreedAllRandomImages);
//
let BreedRandomImage = `https://dog.ceo/api/breed/${breed}/images`;
ajaxGet(allBreedList);
//
let subBreedRandomImage = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`;
ajaxGet(allBreedList);
//
*/
// cargaremos url = urlIn que a suvez caragara segun las necesidades.
//let urlIn = subBreedRandomImage;

//function for att render list
function renderaList (dataIn){
	let data = JSON.parse(dataIn);
	// Målet är få en array även dataIn är en object.
	let attPrint;
	if (typeof(data)==='object'){
		//
		console.log(data.message);
		let dataArray = Object.keys(data.message);
		console.log(dataArray);
		attPrint = dataArray;
	}else{
		attPrint = data;
	}
	console.log(attPrint);
	attPrint.forEach((element)=>{
		//aqui hay que hacer algo para diferenciar la lista col 1 o col 2 MIRANDO SI LA LISTA 1 TIENE CONTENIDO O NO
		let sthetic = capitalize(element);
		vBreedUL.innerHTML += `<li class="breed" id="${element}">${sthetic}</li>`;
		vButtonUrl ='';
		vButtonUrl = allBreedAllRandomImages;

		//extraemos tambien

	})
	//istObj.forEach()

	/*
	let listKeys = Object.keys(listObj);
	console.log(listKeys);
	let listArray = Object.entries(listObj);
	console.log(listArray);
	*/
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
//
vButton.addEventListener('click',()=>{
	ajaxGet(vButtonUrl,(imgUrlJson)=>{
		console.log(imgUrlJson);
		let imgUrl = JSON.parse(imgUrlJson);
		console.log(imgUrl.message);
		vHundImg.setAttribute('src', imgUrl.message);
	})
});


//
ajaxGet(allBreedList,renderaList);
//1. HAY QUE HACER UN EVENTO CLICK SOBRE LA CLASE BREED EN LA LISTA GENERAL. ESTO LLAMARA A LA FUNCION GET AJAX SOBRE LA RAZA EN CONCRETO Y USAREMOS SUS DATOS.
//2. OTRO EVENTO SOBRE LA CLASE SUBREED QUE HAGA LO MISMO ACONTANDO A DATOS SUBREED  
// aqui un event listener click sobre breed que active una logica de busqueda sobre objeto para ver sus objetos