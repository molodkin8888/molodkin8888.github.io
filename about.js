function initiate(){
	var loc=document.getElementById('getlocation');
	loc.addEventListener('click', getlocation, false);
}

function getlocation(){
	navigator.geolocation.getCurrentPosition(showinfo);
}
function showinfo(position){
	var myLocation=document.getElementById('myLocation');
	var data='';
	data+='Широта: ' +position.coords.latitude+'<br>';
	data+='Долгота: ' +position.coords.longitude+'<br>';
	data+='Точность: ' +position.coords.accuracy+'<mts.<br>';
	myLocation.innerHTML=data;
}

window.addEventListener('load', initiate, false);

