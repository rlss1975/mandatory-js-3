'use strict';
//
//main column 1 i main /index.html
let vBreedUL = document.querySelector('#ulBreed');
//main column 2
let vSubBreedUL = document.querySelector('#ulSubBreed');
//main column 3
let vHundTitle = document.querySelector('#hundTitle');
let vHundImg = document.querySelector('#hundBild');
let vButton = document.querySelector('#knapp');
let vSelectedBreed = document.getElementsByClassName('classBreed');
let vSelectedSubBreed = document.getElementsByClassName('classSubBreed');
let selectedItemIListorna;
let lastSelectedBreed;
//
//Internal data i .js
let vButtonUrl;
let allBreedList = 'https://dog.ceo/api/breeds/list/all';
let allBreedAllRandomImages = 'https://dog.ceo/api/breeds/image/random';
//let breedRandomImage = `https://dog.ceo/api/breed/${}/images/random`;
//let subBreedRandomImage = `https://dog.ceo/api/breed/${}/${}/images/random`;
let data;
let flagBreedSelected = 0;
let flagSubBreedSelected = 0;
//
//
/*******************************************/
/*********PROGRAM EXECUTION CONTROL*********/
/*******************************************/
//
ajaxGet(allBreedList,renderaList);
//
vButton.addEventListener('click',()=>{ajaxGet(vButtonUrl,getImgUrl)});
//
/*******************************************/
/*******************************************/

//
function ajaxGet (url,myFunction){
	let req = new XMLHttpRequest();
	req.open('GET',url,true);
	req.addEventListener('load',()=>{
		if (req.status >= 200 && req.status < 400) {
			//console.log(req.responseText);
			myFunction(req.responseText);
		}else{
			console.log(req.status +" "+ req.statusText);
		}
	});
	req.addEventListener('error',()=>{console.log('Förfrågan lyckades inte nå serven');});
	req.send(null);
};


//
//function for att render list
/*
function renderaGeneralList (dataIn){
		//Vi renderar list på column 1 ( general breed lista)
		data = JSON.parse(dataIn);
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
		});
		listAddEvent(vSelectedBreed);
};*/
function renderaList (dataIn){
	//Vi renderar list på column 1 ( general breed lista)
	
	if (flagBreedSelected === 0 && flagSubBreedSelected === 0){

		data = JSON.parse(dataIn);
		//vaciamos lista subrazas
		for (let breed in data.message){
			//console.log(breed);
			let sthetic = capitalize(breed);
			//console.log(sthetic);
			vBreedUL.innerHTML += `<li class="classBreed" id="${breed}">${sthetic}</li>`;
		}
		//debugger;
		listAddEvent(vSelectedBreed);
		//debugger;
		vButtonUrl ='';
		vButtonUrl = allBreedAllRandomImages;
		// vi passar på för att rendera en första img för att göra funktionalitet snyggare.
		ajaxGet(vButtonUrl,getImgUrl)
		//har controlerar vi om någon har clikat nån breed col 1
		
	}else	if(flagBreedSelected === 1 && flagSubBreedSelected === 0){
		//random image for alla breed 
		vSubBreedUL.innerHTML = '';
		for (let breed of data.message[selectedItemIListorna]) {
				// bara som memmory for använda senare
				lastSelectedBreed = selectedItemIListorna;
				//vi passar på att rendera och visar sub-breed av selected breed
				console.log(breed);
				let sthetic = capitalize(breed);
				vSubBreedUL.innerHTML += `<li class="classSubBreed" id="${breed}">${sthetic}</li>`;
		}
		//debugger;
		listAddEvent(vSelectedSubBreed);
  	vButtonUrl ='';
		vButtonUrl = `https://dog.ceo/api/breed/${selectedItemIListorna}/images/random`;
		ajaxGet(vButtonUrl,getImgUrl);
	
	}else if (flagBreedSelected === 0 && flagSubBreedSelected === 1){	
		vButtonUrl ='';
		vButtonUrl = `https://dog.ceo/api/breed/${lastSelectedBreed}/${selectedItemIListorna}/images/random`;
		ajaxGet(vButtonUrl,getImgUrl);
	}
};

		

//
/* Här vi lägar till värje item i listor en event för att veta 
vilket här clickt usr (breed /eller/ subbreed) */
function listAddEvent(liElements){
	console.log(liElements);;
	//debugger;
		for (let liBreed of liElements){
				liBreed.addEventListener('click',(event)=>{
							//debugger;
							flagBreedSelected = 0;
							flagSubBreedSelected = 0;
							console.log(event);
							selectedItemIListorna = event.target.id;
							console.log(selectedItemIListorna);
							if(event.target.className ==='classBreed'){
								flagBreedSelected = 1;
								flagSubBreedSelected = 0;
								
							}else if (event.target.className === 'classSubBreed'){
								flagBreedSelected = 0;
								flagSubBreedSelected = 1;
								

							}else{
								console.log("error i listAddEvent()");
							}
							renderaList(data);
							

				});
		};
};
//
//capitalize viktor®
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
//
//När man klikar på knappen vi gör en req till adressen som är laddad i vButtonUrl. Adressen ska bli kopplad till någon random img iAPI beroende på vilket adressen behover program logik. Detta adressen är laddad i <img>.
function getImgUrl (imgUrlJson) {
				console.log(imgUrlJson);
				let imgUrl = JSON.parse(imgUrlJson);
				console.log(imgUrl.message);
				vHundImg.setAttribute('src', imgUrl.message);
				//
				
};

//





//

//aqui convertimos en listeners a los elementos 


//1. HAY QUE HACER UN EVENTO CLICK SOBRE LA CLASE BREED EN LA LISTA GENERAL. ESTO LLAMARA A LA FUNCION GET AJAX SOBRE LA RAZA EN CONCRETO Y USAREMOS SUS DATOS.
//2. OTRO EVENTO SOBRE LA CLASE SUBREED QUE HAGA LO MISMO ACONTANDO A DATOS SUBREED  
// aqui un event listener click sobre breed que active una logica de busqueda sobre objeto para ver sus objetos