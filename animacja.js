	var srednica = 30; // pilki
	var szerLini = 4; // pilki

	// pozycja pi³ki
	var pozycja = {
		x: 100,
		y: window.innerHeight - 200
	};
	// wektor ruchu
	var wektor = {
		x: 0,
		y: 0
	};

	var grawitacja = 0.09;
	var tarcie = 0.01;
	var predkosc = 0;
	var kat = 0;
	var radiany = 0;
	
	//========================================================================
	//kolizje

	function kolizjaPierwszy() {
		wektor.x = -wektor.x - (-wektor.x * tarcie);
		wektor.y = wektor.y - (wektor.y * tarcie);
	}

	function kolizjaDrugi() {
		wektor.x = wektor.x - (wektor.x * tarcie);
		wektor.y = -wektor.y - (-wektor.y * tarcie);
	}

	//========================================================================

	// x, y, kolor lini, kolor wypelnienia
	function rysujBile(x, y, colorLinie, colorFill) {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.arc(x, y, srednica, 0, 2 * Math.PI, false);		
		ctx.fillStyle = colorFill;
		ctx.fill();
		ctx.lineWidth = szerLini;
		ctx.strokeStyle = colorLinie;
		ctx.stroke();
	}
	// console.log(pozycja.y);
	
	function ruchPilki() {

		
	
		if (wektor.x == 0 && wektor.y == 0) return;

		wektor.x = wektor.x - (wektor.x * tarcie);
		wektor.y = wektor.y - (wektor.y * tarcie);
		wektor.y = wektor.y + grawitacja;
		
		if (wektor.x != 0 || wektor.y != 0) {
			if (pozycja.x + wektor.x <= srednica || pozycja.x + wektor.x >= window.innerWidth - srednica) {
				kolizjaPierwszy();
			} 
			else if (pozycja.y + wektor.y <= srednica || pozycja.y + wektor.y >= window.innerHeight - srednica) {
				kolizjaDrugi();
			}
			//console.log(pozycja.x);
			
			pozycja.x = pozycja.x + wektor.x;
			pozycja.y = pozycja.y + wektor.y;
		}
		
		// console.log('Wektor ruchu: ' + wektor.x + ' ' + wektor.y );
		// console.log('Pozycja pilki: ' + pozycja.x + ' ' + pozycja.y );
		
	}


	function rysuj() {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.canvas.width = window.innerWidth;
		ctx.canvas.height = window.innerHeight;
		rysujBile(pozycja.x, pozycja.y, '#4d1f00', '#e65c00'); //pomaranczowa

		//console.log(pozycja.x);
	}

	
	function rysujKosz(){
		
	}
	
	
	function startBiala() {
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		predkosc = $("#speed").val();
		kat = $("#angle").val();
		radiany = kat * Math.PI / 180;
		wektor.x = Math.cos(radiany) * predkosc;
		wektor.y = Math.sin(radiany) * predkosc;

		//console.log(kat);
	}

	function reset() {
		pozycja.x = 100;
		pozycja.y = window.innerHeight - 200;
		wektor.x = 0;
		wektor.y = 0;
	}

	function timer() {
		setInterval(rysuj, 20);
		setInterval(ruchPilki, 10);
	}

	//===========================================================================

	$(document).ready(function() {
		
		rysujKosz();

		$('#run').click(function() {
			startBiala();
		});

		$('#reset').click(function() {
			reset();
		});
	});