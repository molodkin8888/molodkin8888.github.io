function getChar(event){
	if(event.which == null){
		if(event.keyCode < 32) 
			return null;
		return String.fromCharCode(event.keyCode)
	}
		if(event.which != 0 && event.charCode != 0){
			if(event.which < 32) return null;
			return String.fromCharCode(event.which)
		}
		return null;
	}

	var form = document.forms.calculator; 

	var moneyElem = form.elements.money; 
	
	moneyElem.onkeypress = function(e) {
		e == e || event;
		var chr = getChar(e);

		if(e.ctrlKey || e.altKey || chr == null) return;
		if(chr < '0' || chr > '9') return false;
	}

	moneyElem.onkeyup = calculate; 

	moneyElem.oninput = calculate; 

	moneyElem.onpropertychange = function(){
		event.propertyName = "value" && calculate();
	}

	var capitalizationElem = form.elements.capitalization;
	capitalizationElem.onclick = calculate;

	var monthElem = form.elements.month;
	monthElem.onchange = calculate;

	function calculate(){
		var sum = +moneyElem.value;
		if(!sum) return;

		var monthlyIncrease = 0.01;

		if(!capitalizationElem.checked){
			sum = sum * (1 + monthlyIncrease + monthElem.value);
		}else{
			for(var i = 0; i < monthElem.value; i++){
				sum = sum * (1 + monthlyIncrease);
			}
		}

		var height = sum / moneyElem.value * 100 + 'px';
		document.getElementById('height-after').style.height = height;
      	document.getElementById('money-before').innerHTML = moneyElem.value;
     	document.getElementById('money-after').innerHTML = sum;
	}

	calculate();