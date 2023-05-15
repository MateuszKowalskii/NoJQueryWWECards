const obrazki = ['cena.jpg','finn balor.jpg','triple h.jpg','aj styles.jpg','edge.jpg','ronda rousey.jpg','becky lynch.jpg','charlotte flair.jpg','roman reigns.jpg','randy orton.jpg','kevin owens.jpg','seth rollins.jpg','bayley.jpg','sasha banks.jpg','sami zayn.jpg','baron corbin.jpg','rey mysterio.jpg','drew mcintyre.jpg','sheamus.jpg','bobby lashley.jpg'];

var wybor = localStorage.getItem('property');
var selekcja = [];
var LICZNIK = 0;
var BLOKADA = false;


var kol, wier, wymiar;
if(wybor==1){kol = 4; wier = 4; wymiar ="124px"}
else if(wybor==2){kol = 7; wier = 4; wymiar ="124px"}
else if(wybor==3){kol = 8; wier = 5; wymiar ="96px"}

let ilosc_kart = kol * wier;
const startowa_ilosc_kart = ilosc_kart;
for(i=0;i<ilosc_kart ;i++){
	dodaj();
}

window.addEventListener('load',function(){ wygeneruj();});

try{
	document.getElementById('nr1').addEventListener('click',function(){localStorage.setItem('property', 1);});
	document.getElementById('nr2').addEventListener('click',function(){localStorage.setItem('property', 2);});
	document.getElementById('nr3').addEventListener('click',function(){localStorage.setItem('property', 3);});
	
}catch(error){}

function wygeneruj(){
	
	LICZNIK = 1;
	if(document.title == "WWE cards")wybor = 0;
	if (wybor==1 || wybor==2 || wybor==3){
		let html ='';
		for(i=1;i<=wier;i++){
			for(j=1;j<=kol;j++){
				html += '<div class = "karta" id ="nr'+LICZNIK +'"></div>'; 
				LICZNIK++;
			}
			html += '<div style = "clear:both"></div>'; 
		}
		
		document.getElementById("kontener").innerHTML += html;
		
		karty = document.getElementsByClassName("karta");	
		
		for(LICZNIK = 1;LICZNIK <= kol*wier;LICZNIK++){
			let a = LICZNIK;
			document.getElementById('nr'+LICZNIK).addEventListener("click",function(){ odkryj(a);});
			karty[LICZNIK-1].style.height = wymiar;
			karty[LICZNIK-1].style.width = wymiar;
		}
	}
}
function dodaj(){
	
	let ilosc = 0;
	let czy = true;
	let x;
	
	while(czy == true || LICZNIK == ilosc_kart -1){
		ilosc = 0;
		x = Math.floor((Math.random() * ilosc_kart/2)+1);

		for(i=0;i<LICZNIK;i++){
			if(selekcja[i] == x)ilosc++;
		}
		if(ilosc<2 || LICZNIK==0){
			selekcja.push(x);
			LICZNIK++;
			czy = false;
		}
	}
}

var podejscie = 0;
var indeks_pierwszej = -1;
var id_pierwszej = -1;
var indeks_drugiej = -1;
var id_drugiej = -1;

function odkryj(podana){
	
	if(!BLOKADA){
		podejscie++;
		document.getElementById('nr'+podana).style.backgroundImage = 'url("img/'+obrazki[selekcja[podana-1]-1]+'")';
		if(podejscie == 1){
			
			indeks_pierwszej = selekcja[podana-1]-1;
			id_pierwszej = podana;
		}
		else if(id_pierwszej == podana){
			;
		}
		else{
			
			indeks_drugiej = selekcja[podana-1]-1;
			id_drugiej = podana;
			BLOKADA = true;
			setTimeout('schowaj2karty()',750);
			podejscie = 0;
		}
	}
}
function schowaj2karty(){
	
		if(indeks_pierwszej == indeks_drugiej && id_pierwszej != id_drugiej){
			document.getElementById('nr'+id_drugiej).style.opacity = 0;

			var stary_element2 = document.getElementById('nr'+id_drugiej);
			var nowy_element2 = stary_element2.cloneNode(true);
			stary_element2.parentNode.replaceChild(nowy_element2, stary_element2);
			document.getElementById('nr'+id_pierwszej).style.opacity = 0;
			var stary_element1 = document.getElementById('nr'+id_pierwszej);
			var nowy_element1 = stary_element1.cloneNode(true);
			stary_element1.parentNode.replaceChild(nowy_element1, stary_element1);
			
			ilosc_kart -= 2;
		}
		else{
			document.getElementById('nr'+id_drugiej).style.backgroundImage = 'url("img/karta tyl.png")';
			document.getElementById('nr'+id_pierwszej).style.backgroundImage = 'url("img/karta tyl.png")';
		}
		LICZNIK++;
		document.getElementById("odkrycia").innerText = LICZNIK - startowa_ilosc_kart - 1;
		BLOKADA = false;
		if(ilosc_kart == 0)napis_koncowy();
}

document.getElementById("dzwiek").addEventListener("click",function(){graj();});
let stan_dzwieku = false;
let muzyka = new Audio('audio/Head Of The Table.mp3');
function graj(){
	
	if(stan_dzwieku == false){
		muzyka.play();
		document.getElementById("glosnik").classList.add('icon-volume-off');
		document.getElementById("glosnik").classList.remove('icon-volume-high');
		stan_dzwieku = true;
	}
	else{
		muzyka.pause();
		document.getElementById("glosnik").classList.add('icon-volume-high');			
		document.getElementById("glosnik").classList.remove('icon-volume-off');
		stan_dzwieku = false;
	}
}
function napis_koncowy(){
	
	let napis = Math.floor(Math.random()*3 + 1);
	let komunikat='</br></br></br>';
	if(napis == 1)komunikat += 'Dobra robota. Zasłużyłeś sobie na kubek kawki <i class="icon-emo-coffee"></i>';
	else if(napis == 2)komunikat += 'Nieźle. Brawo. Geniusz! <i class="icon-emo-sunglasses"></i>';
	else if(napis == 3)komunikat += 'Super. Masz celność rewolwerowca! <i class="icon-emo-shoot"></i>';
	
	komunikat += '</br></br>Przeszedłeś grę w '+document.getElementById("odkrycia").innerText+ 'rund</br>Jeszcze raz?</br><a href="index.html"></br>Zagraj jeszcze raz</a>';

	document.getElementById("kontener").innerHTML = komunikat;
}
