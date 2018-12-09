'use strict';
//
//main column 1 i main /index.html
let vBreedUL = document.querySelector('#breed')
//main column 2
let vSubBreedUL = document.querySelector('#idSubBreed')
//main column 3
let vHundTitle = document.querySelector('#hundTitle');
let vHundImg = document.querySelector('#hundBild')
let vButton = document.querySelector('#knapp');
let vSelectedBreed = document.getElementsByClassName('breed');
let vSelectedSubBreed = document.getElementsByClassName('SubBreed');
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
/************PROGRAM EXECUTION**************/
/*******************************************/
ajaxGet(allBreedList,renderaList);
/*******************************************/
/*******************************************/
//
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
//function for att render list
function renderaList (dataIn){
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
};
//
function listAddEvent(liElements){
	//
		for (let liBreed of liElements){
				liBreed.addEventListener('click',(event)=>{
							//
							flagBreedSelected = 0;
							flagSubBreedSelected = 0;
							console.log(event);
							let selectedHund = event.target.id;
							console.log(selectedHund);
							if(event.target.className ==='breed'){
								flagBreedSelected = 1;
							}else if (event.target.className === 'subBreed'){
								flagSubBreedSelected = 1;
							}else{
								console.log("jag vet inte");
							}
							//
							//
							if( flagBreedSelected === 1 && flagSubBreedSelected === 0){
								console.log(data);
								for (let subItem of data.message[selectedHund]) {
									//vi passar på att rendera och visar sub-breed av selected breed
									console.log(subItem);
									let sthetic = capitalize(subItem);
									vSubBreedUL.innerHTML += `<li class="subBreed" id="${subItem}">${sthetic}</li>`;
								}
								vButtonUrl ='';
								vButtonUrl = `https://dog.ceo/api/breed/${selectedHund}/images/random`;
							}else if (flagBreedSelected === 0 && flagSubBreedSelected === 1){
								//
								//
							}else{
								//
								//
							}
							for (let liSubBreed of vSelectedSubBreed) {
									debugger;
									console.log(liSubBreed);
							}
				});
		};
};
//
//
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
//
//event knappen Refresh Img
vButton.addEventListener('click',()=>{
	ajaxGet(vButtonUrl,(imgUrlJson)=>{
				console.log(imgUrlJson);
				let imgUrl = JSON.parse(imgUrlJson);
				console.log(imgUrl.message);
				vHundImg.setAttribute('src', imgUrl.message);
		})
});
//




//

//aqui convertimos en listeners a los elementos 


//1. HAY QUE HACER UN EVENTO CLICK SOBRE LA CLASE BREED EN LA LISTA GENERAL. ESTO LLAMARA A LA FUNCION GET AJAX SOBRE LA RAZA EN CONCRETO Y USAREMOS SUS DATOS.
//2. OTRO EVENTO SOBRE LA CLASE SUBREED QUE HAGA LO MISMO ACONTANDO A DATOS SUBREED  
// aqui un event listener click sobre breed que active una logica de busqueda sobre objeto para ver sus objetos