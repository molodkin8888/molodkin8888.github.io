menu.onclick = function myFunction(){
	var a = document.getElementById("myNav");

	if(a.className ==="nav") {
		a.className += " responsive";
	} else{
		a.className = "nav";
	}
}

