function initiate(){
	var but = document.getElementById('Random');
	but.addEventListener('click', Random, false);
}

function Random(min, max){
	var randoma = Math.random() * (max - min) - min(show);
}

function show(rand){
	var rands=document.getElementById('rands');
	var data=' ';
	rands.innerHTML=data;
}

window.addEventListener('load', initiate, false);