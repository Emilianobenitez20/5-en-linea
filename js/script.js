var tabla = document.getElementsByClassName("gomoku")[0];
var dibujar = tabla.getContext("2d");

dibujar.strokeStyle = "black";

let ArrayX = [];
let ArrayY = [];
var control = false;
var uControl = false;
var resultAi = 0;
var resultYo = 0;
const atras = document.getElementById("atras");
atras.addEventListener('click', function () {
	if (termino == true) {
		return;
	}
	//Volver AI
	uControl = true;
	DesAi((ArrayX[ArrayX.length - 1]), (ArrayY[ArrayY.length - 1]))
	tableroMatriz[ArrayX[ArrayX.length - 1]][ArrayY[ArrayY.length - 1]] = 0;
	ArrayX.pop()
	ArrayY.pop()


	//Volver Usuario
	DesYo((ArrayX[ArrayX.length - 1]), (ArrayY[ArrayY.length - 1]))
	tableroMatriz[ArrayX[ArrayX.length - 1]][ArrayY[ArrayY.length - 1]] = 0;
	ArrayX.pop()
	ArrayY.pop()




});
const restart = document.getElementById("restart");
restart.addEventListener('click', function () {
	for (var g = 0; g < ArrayX.length; g++) {
		DesYo((ArrayX[g]), (ArrayY[g]));
		DesAi((ArrayX[g]), (ArrayY[g]));
		tableroMatriz[ArrayX[g]][ArrayY[g]] = 0;
	}
	ArrayX = []
	ArrayY = []


	for (var t = 0; t < contador; t++) {
		yoGana[t] = 0;
		aiGana[t] = 0;
	}
	termino = false;
});

const uMovimiento = document.getElementById("uMovimiento");
uMovimiento.addEventListener('click', function () {
	if (termino == true) {
		return;
	}
	if (control == true) {
		return;
	}
	uControl = true;
	i = ArrayX[ArrayX.length - 1];
	j = ArrayY[ArrayY.length - 1];
	dibujar.beginPath();
	dibujar.strokeStyle = "red";
	dibujar.strokeRect(i * 30 - 12, j * 30 - 12, 25, 25);

	dibujar.closePath();
	dibujar.fill();
});

for (var i = 0; i < 15; i++) {
	//Hotizontal
	dibujar.moveTo(15, 15 + i * 30); //Desde x,y
	dibujar.lineTo(15 * 30 - 15, 15 + i * 30); //Hasta x,y
	dibujar.stroke(); //Conectar

	//Vertical
	dibujar.moveTo(15 + i * 30, 15); //Desde x,y
	dibujar.lineTo(15 + i * 30, 15 * 30 - 15); //Hasta x,y
	dibujar.stroke();
}
// Funcion pintar
function Colocar(i, j, yo) {
	dibujar.beginPath();
	dibujar.arc(1 + i * 30, 1 + j * 30, 10, 0, 2 * Math.PI);
	dibujar.closePath();

	var color;
	if (yo) {
		color = "#4692FA";
	}
	else {
		color = "#FF0000";
	}
	dibujar.fillStyle = color;
	dibujar.fill();
	tableroMatriz[i][j] = 1;
}

function DesAi(i, j) {
	dibujar.beginPath();
	dibujar.arc(1 + i * 30, 1 + j * 30, 13, 0, 2 * Math.PI);
	dibujar.closePath();
	color = "white";
	dibujar.fillStyle = color;
	dibujar.fill();
	tableroMatriz[i][j] = 0;

	if (uControl == true) {
		i = ArrayX[ArrayX.length - 1];
		j = ArrayY[ArrayY.length - 1];
		dibujar.beginPath();
		dibujar.fillStyle = "white";
		dibujar.fillRect(i * 30 - 13, j * 30 - 13, 27, 27);
		dibujar.closePath();
		dibujar.fill();
	}

	for (var k = 0; k < contador; k++) {
		if (Ganar[i][j][k]) {
			aiGana[k]--;
		}
	}
}

function DesYo(i, j) {
	dibujar.beginPath();
	dibujar.arc(1 + i * 30, 1 + j * 30, 13, 0, 2 * Math.PI);
	dibujar.closePath();
	color = "white";
	dibujar.fillStyle = color;
	dibujar.fill();
	tableroMatriz[i][j] = 0;


	for (var k = 0; k < contador; k++) {
		if (Ganar[i][j][k]) {
			yoGana[k]--;
		}
	}
}



var yo = true;

var Ganeyo = true;
var termino = false;
tabla.onclick = function (e) {
	if (e.offsetY > 15 && e.offsetY < 435) {

		if (termino == true) {
			return;
		}
		if (control == true) {
			return;
		}
		if (uControl == true) {
			i = ArrayX[ArrayX.length - 1];
			j = ArrayY[ArrayY.length - 1];
			dibujar.beginPath();
			dibujar.fillStyle = "white";
			dibujar.fillRect(i * 30 - 13, j * 30 - 13, 27, 27);
			dibujar.closePath();
			dibujar.fill();
			dibujar.beginPath();
			dibujar.fillStyle = "red";
			dibujar.arc(1 + i * 30, 1 + j * 30, 10, 0, 2 * Math.PI);
			dibujar.closePath();
			dibujar.fill();
			uControl = false;

		}


		var x = e.offsetX;
		var y = e.offsetY;


		var i;
		var j;


		var columna = 1;
		var fila = 1;

		for (var n = 15; n < 450; n++) {

			if (x > n && x < n + 30) {
				i = columna;
				break;
			}
			columna = columna + 1;
			n = n + 29;
		}
		for (var n = 15; n < 420; n++) {

			if (y > n && y < n + 30) {
				j = fila;
				break;
			}
			fila = fila + 1;
			n = n + 29;
		}
		if (tableroMatriz[i][j] == 1) {
			window.alert("Lugar ocupado");
		}
		else {
			yo = true;
			Colocar(i, j, yo);

			yo = false;
			ArrayX.push(i)
			ArrayY.push(j)


			for (var k = 0; k < contador; k++) {
				if (Ganar[i][j][k]) {
					yoGana[k]++;
					if (yoGana[k] == 5) {
						termino = true;
						ganeyo = true;
						pintarVictoria(ganeyo);
						resultYo += 1;
						document.getElementById('resultYo').innerHTML = resultYo;
					}
				}
			}
			if (!termino) {
				yo = !yo;
				control = true;
				setTimeout("AI()", 400);
			}
		}

	}
}


var tableroMatriz = [];
for (var g = 1; g < 15; g++) {
	tableroMatriz[g] = [];
	for (var h = 1; h < 15; h++) {
		tableroMatriz[g][h] = 0;

	}
}

var Ganar = [];
for (var i = 1; i < 15; i++) {
	Ganar[i] = [];
	for (var j = 1; j < 15; j++) {
		Ganar[i][j] = [];
	}
}



var contador = 0;// ContadorCasilla

//Validacion Horrizontal
for (var i = 1; i < 15; i++) {
	for (var j = 1; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			Ganar[j + k][i][contador] = true;
		}
		contador++;
	}
}

//Validacion Vertical
for (var i = 1; i < 15; i++) {
	for (var j = 1; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			Ganar[i][j + k][contador] = true;
		}
		contador++;
	}
}
// Diagonal derecha hacia abajo
for (var i = 1; i < 11; i++) {
	for (var j = 1; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			Ganar[i + k][j + k][contador] = true;
		}
		contador++;
	}
}

// Diagonal derecha hacia arriba
for (var i = 1; i < 11; i++) {
	for (var j = 14; j > 4; j--) {
		for (var k = 0; k < 5; k++) {
			Ganar[i + k][j - k][contador] = true;
		}
		contador++;
	}
}



var yoGana = [];
var aiGana = [];
for (var t = 0; t < contador; t++) {
	yoGana[t] = 0;
	aiGana[t] = 0;
}




var yoScore = [];
var aiScore = [];

// Inicializar Score
for (var i = 1; i < 15; i++) {
	yoScore[i] = [];
	aiScore[i] = [];
	for (var j = 1; j < 15; j++) {
		yoScore[i][j] = 0;
		aiScore[i][j] = 0;
	}
}

for (var i = 1; i < 15; i++) {
	for (var j = 1; j < 15; j++) {
		if (tableroMatriz[i][j] == 0) {
			for (var k = 0; k < contador; k++) {
				if (Ganar[i][j][k]) {
					if (Ganar[k] == 1) {
						yoScore[i][j] += 200;
					}
					else if (Ganar[k] == 2) {
						yoScore[i][j] += 400;
					}
					else if (Ganar[k] == 3) {
						yoScore[i][j] += 2000;
					}
					else if (Ganar[k] == 4) {
						yoScore[i][j] += 10000;
					}

					
					if (aiGana[k] == 1) {
						aiScore[i][j] += 190;
					}
					else if (aiGana[k] == 2) {
						aiScore[i][j] += 390;
					}
					else if (aiGana[k] == 3) {
						aiScore[i][j] += 1800;
					}
					else if (aiGana[k] == 4) {
						aiScore[i][j] += 20000;
					}
				}
			}

			if (yoScore[i][j] > max) {
				max = yoScore[i][j];
				x = i;
				y = j;
			}
			else if (yoScore[i][j] = max) {
				if (aiScore[i][j] > max) {
					max = aiScore[i][j];
					x = i;
					y = j;
				}
			}

			if (yoScore[i][j] > max) {
				max = aiScore[i][j];
				x = i;
				y = j;
			}
			else if (aiScore[i][j] = max) {
				if (yoScore[i][j] > max) {
					max = yoScore[i][j];
					x = i;
					y = j;
				}
			}
		}
	}
}

function AI() {
	control = false;
	var yoScore = [];
	var aiScore = [];

	for (var i = 1; i < 15; i++) {
		yoScore[i] = [];
		aiScore[i] = [];

		for (var j = 1; j < 15; j++) {
			yoScore[i][j] = 0;
			aiScore[i][j] = 0;
		}
	}

	var max = 0;
	var x = 0, y = 0;

	for (var i = 1; i < 15; i++) {
		for (var j = 1; j < 15; j++) {
			if (tableroMatriz[i][j] == 0) {
				for (var k = 0; k < contador; k++) {
					if (Ganar[i][j][k]) {

						if (yoGana[k] == 1) {
							yoScore[i][j] += 200;
						}
						else if (yoGana[k] == 2) {
							yoScore[i][j] += 400;
						}
						else if (yoGana[k] == 3) {
							yoScore[i][j] += 2000;
						}
						else if (yoGana[k] == 4) {
							yoScore[i][j] += 10000;
						}

						if (aiGana[k] == 1) {
							aiScore[i][j] += 190;
						}
						else if (aiGana[k] == 2) {
							aiScore[i][j] += 390;
						}
						else if (aiGana[k] == 3) {
							aiScore[i][j] += 1800;
						}
						else if (aiGana[k] == 4) {
							aiScore[i][j] += 20000;
						}
					}
				}

				if (yoScore[i][j] > max) {
					max = yoScore[i][j];
					x = i;
					y = j;
				}
				else if (yoScore[i][j] = max) {
					if (aiScore[i][j] > max) {
						max = aiScore[i][j];
						x = i;
						y = j;
					}
				}

				if (aiScore[i][j] > max) {
					max = aiScore[i][j];
					x = i;
					y = j;
				}
				else if (aiScore[i][j] = max) {
					if (yoScore[i][j] > max) {
						max = yoScore[i][j];
						x = i;
						y = j;
					}
				}
			}
		}
	}


	// Colocación de la computadora
	yo = false;
	Colocar(x, y, yo);
	ArrayX.push(x)
	ArrayY.push(y)
	tableroMatriz[x][y] = 1;

	
	for (var k = 0; k < contador; k++) {
		if (Ganar[x][y][k]) {
			aiGana[k]++;
			if (aiGana[k] == 5) {
				termino = true;
				ganeyo = false;
				pintarVictoria(ganeyo);
				resultAi += 1;
				document.getElementById('resultAi').innerHTML = resultAi;
			}
		}
	}

}

function pintarVictoria() {

	for (var i = 1; i < 15; i++) {
		for (var j = 1; j < 15; j++) {
			for (var k = 0; k < contador; k++) {
				if (Ganar[i][j][k]) {
					if (aiGana[k] == 5) {
						dibujar.beginPath();
						dibujar.arc(1 + i * 30, 1 + j * 30, 10, 0, 2 * Math.PI);
						dibujar.strokeStyle = "#990000";
						dibujar.fillStyle = "#990000";
						dibujar.fill();
					}
					if (yoGana[k] == 5) {
						dibujar.beginPath();
						dibujar.arc(1 + i * 30, 1 + j * 30, 10, 0, 2 * Math.PI);
						dibujar.strokeStyle = "#0028FA";
						dibujar.fillStyle = "#0028FA";
						dibujar.fill();
					}
				}
			}
		}
	}
	if (ganeyo) {
		window.alert("Ganaste");
	}
	else {
		window.alert("Perdiste");
	}
}


