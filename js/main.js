// async function  show(){
// 	let some =  fetch('https://private-anon-0bfbaf26c5-lyricsovh.apiary-mock.com/v1/jewel/stand');
	
// 	console.log(some)
// }

// show();

const API_URL = 'https://api.lyrics.ovh/v1/';

const form  = document.querySelector('#form');

const search = document.querySelector('#search');

const result = document.querySelector('#result');

const more = document.querySelector('#more');

console.log(form,search,result,more)
// 事件监听

form.addEventListener('submit',e=>{
	e.preventDefault();
	console.log(e)
	const searchTerm = search.value.trim();
	// searchTerm || alert('输入内容谢谢')
	if(!searchTerm){
		alert('输入内容谢谢');
	}else {
		search(searchTerm);
	}
	console.log(searchTerm)
})