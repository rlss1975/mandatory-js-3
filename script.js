'use strict';
//
//main column 1 
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
//Internal data i .js
let vButtonUrl;
let allBreedList = 'https://dog.ceo/api/breeds/list/all';
let allBreedAllRandomImages = 'https://dog.ceo/api/breeds/image/random';
//let breedRandomImage = `https://dog.ceo/api/breed/${}/images/random`;
//let subBreedRandomImage = `https://dog.ceo/api/breed/${}/${}/images/random`;
//
//internal data
let data;
let flagBreedSelected = 0;
let flagSubBreedSelected = 0;
let reloadBreed;
let reloadSubBreed;
let userReload = false;
//
/*******************************************/
/*********PROGRAM EXECUTION CONTROL*********/
/*******************************************/
vButton.addEventListener('click',()=>{ajaxGet(vButtonUrl,getImgUrl)});
//
//hashKontroll();//Här ska programmet bara komma om reload page.
//
ajaxGet(allBreedList,renderaList);
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
function renderaList (dataIn){
	//
	//Renderar list på column 1 ( general breed lista)
	if (flagBreedSelected === 0 && flagSubBreedSelected === 0){
		data = JSON.parse(dataIn);
		for (let breed in data.message){
			//console.log(breed);
			let sthetic = capitalize(breed);
			//console.log(sthetic);
			vBreedUL.innerHTML += `<li class="classBreed" id="${breed}">${sthetic}</li>`;
		}
		listAddEvent(vSelectedBreed);
		vButtonUrl ='';
		vButtonUrl = allBreedAllRandomImages;
		// vi passar på för att rendera default första img. 
		ajaxGet(vButtonUrl,getImgUrl)
		//
		//
	}else	if(flagBreedSelected === 1 && flagSubBreedSelected === 0){ // <== har controlerar vi om någon har clikat nån breed col 1.
		//random image for alla breed 
		vSubBreedUL.innerHTML = '';
		if (userReload === true){selectedItemIListorna = reloadBreed;};
		for (let breed of data.message[selectedItemIListorna]) {
				lastSelectedBreed = selectedItemIListorna;// bara som memmory for använda senare
				//vi passar på att rendera och visar sub-breed list av selected breed
				console.log(breed);
				let sthetic = capitalize(breed);
				vSubBreedUL.innerHTML += `<li class="classSubBreed" id="${breed}">${sthetic}</li>`;
		}
		//debugger;
		listAddEvent(vSelectedSubBreed);
  	vButtonUrl ='';
		vButtonUrl = `https://dog.ceo/api/breed/${selectedItemIListorna}/images/random`;	
		ajaxGet(vButtonUrl,getImgUrl);
		window.location.hash = `#${selectedItemIListorna}`;
	//
	//
	}else if (flagBreedSelected === 0 && flagSubBreedSelected === 1){	
		vButtonUrl ='';
		vButtonUrl = `https://dog.ceo/api/breed/${lastSelectedBreed}/${selectedItemIListorna}/images/random`;
		ajaxGet(vButtonUrl,getImgUrl);
		window.location.hash = `#${lastSelectedBreed}/${selectedItemIListorna}`;
	}
};
//
/* Här vi lägar till värje item i listor en event för att veta och
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
//När man klikar på knappen vi gör en req till adressen som är laddad i vButtonUrl. 
//Adressen ska bli kopplad till någon random img iAPI beroende på vilket adressen behover program logik. Detta adressen är laddad i <img>.
function getImgUrl (imgUrlJson) {
	console.log(imgUrlJson);
	let imgUrl = JSON.parse(imgUrlJson);
	console.log(imgUrl.message);
	vHundImg.setAttribute('src', imgUrl.message);
	//
	//set Hund Name
	let strUrl = imgUrl.message;
	let arrUrl = strUrl.split('/');				
	arrUrl = arrUrl[4].replace('-',' ');
	let name = capitalize(arrUrl);
	vHundTitle.textContent = `${name}.`;
	//userReload = false;
};
//
function hashKontroll(){
	//debugger;
	let vHash = window.location.hash;
	ajaxGet(allBreedList,renderaList);
	if (vHash != false){
		console.log(vHash);
		//debugger;
		vHash = vHash.split('/');
		console.log(vHash);
		if (vHash.length === 1){
			flagBreedSelected = 1;
			flagSubBreedSelected = 0;
			userReload = true;

		}else if (vHash.length === 2){
			flagBreedSelected = 0;
			flagSubBreedSelected = 1;
			userReload = true;
		}else{
			flagBreedSelected = 0;
			flagSubBreedSelected = 0;
			userReload = false;
		}
		reloadBreed = vHash[0].slice(1);
		console.log(reloadBreed);
		reloadSubBreed = vHash[1];
		console.log(reloadSubBreed);
	}
};
//

