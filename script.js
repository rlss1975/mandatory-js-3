'use strict';

//esta ruta me devolvera una imagen random
//sobre todas las razas
//cargaremos sobre imagen y su url/src
//https://dog.ceo/api/breeds/list/all
//https://dog.ceo/api/breeds/image/random
//

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
let allBreedAllRandomImages = 'https://dog.ceo/api/breeds/image/random';
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
	// här, convertera obj av obj, till array .
	let print;
	if (typeof(data)==='object'){
		console.log(data.message);
		let dataArray = Object.keys(data.message);
		console.log(dataArray);
		print = dataArray;
	}else{
		print = data;
	}
	console.log(print);
	print.forEach(()=>{
		//rendera con DOM

	})
	//istObj.forEach()

	/*
	let listKeys = Object.keys(listObj);
	console.log(listKeys);
	let listArray = Object.entries(listObj);
	console.log(listArray);
	*/
}
ajaxGet(allBreedList,renderaList);