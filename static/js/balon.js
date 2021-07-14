import Jugadores from "./jugador.js"

class Balon {
	constructor(elemento = HTMLElement.prototype) {
		this.elemento = elemento
	}

	get izquierda() {
		if (this.elemento.style.left)
			return parseInt(obtenerPixeles(this.elemento.style.left))

		return 15
	}

	get arriba() {
		if (this.elemento.style.top)
			return parseInt(obtenerPixeles(this.elemento.style.top))

		return 15
	}

	get moverHacia() {
		return {
			izquierda: () => this.elemento.style.left = `calc(50% - ${this.izquierda + 10}px)`,
			derecha: () => this.elemento.style.left = `calc(50% - ${this.izquierda - 10}px)`,

			arriba: () => this.elemento.style.top = `calc(50% - ${this.arriba + 10}px)`,
			abajo: () => this.elemento.style.top = `calc(50% - ${this.arriba - 10}px)`
		}
	}
}



/* DOM */
const $balon = document.querySelector('div[name="balon"]')
const balon = new Balon($balon)
const direcciones = ['izquierda', 'derecha', 'arriba', 'abajo']
var intervalo

export default function iniciar() {
	let moverHacia = [
		numeroAleatorio(0, 1),
		numeroAleatorio(2, 3),
	]

	$balon.style.left = 'calc(50% - 15px)'
	$balon.style.top = 'calc(50% - 15px)'
	$balon.style.visibility = 'visible'

	esperar(2000).then(() => {
		intervalo = setInterval(() => {
			// Moviendo balon
			let direccion = direcciones[moverHacia[0]]
			balon.moverHacia[direccion]()

			direccion = direcciones[moverHacia[1]]
			balon.moverHacia[direccion]()

			// Checando si el balon ha llegado hasta arriba o hasta abajo para cambiar
			// de direccion vertical
			if (balon.arriba >= window.innerHeight / 2) {
				moverHacia[1] = 3
			}
			if (balon.arriba * -1 + 30 >= window.innerHeight / 2) {
				moverHacia[1] = 2
			}

			// Checando si el balon ha llegado hasta la derecha o hasta la izquierda para
			// reiniciar el juego
			if (balon.izquierda * -1 >= window.innerWidth / 2) { // El balon esta en la izquierda
				Jugadores.obtener[0].aumentarPuntaje()
				reiniciar()
			}
			if (balon.izquierda >= window.innerWidth / 2) {	// El balon esta en la derecha
				Jugadores.obtener[1].aumentarPuntaje()
				reiniciar()
			}


			// Checando si el balon ha chocado con uno de los jugadores
			// Jugador 1
			if (window.innerHeight / 2 - balon.arriba >= Jugadores.obtener[0].arriba &&
				window.innerHeight / 2 - balon.arriba <= Jugadores.obtener[0].arriba + window.innerHeight / 2) {
				if (balon.izquierda >= window.innerWidth / 2 - 88) {
					// Para poder hacer la ronaldinha (o sea pasar el balon dentro del jugador,
					// como si el jugador fuera un tunel):
					moverHacia[0] == 0? moverHacia[0] = 1: moverHacia[0] = 0
				}
				if (balon.izquierda >= window.innerWidth / 2 - 58) {
					moverHacia[0] == 0? moverHacia[0] = 1: moverHacia[0] = 0
				}
			}
			// Jugador 2
			if (window.innerHeight / 2 - balon.arriba >= Jugadores.obtener[1].arriba &&
				window.innerHeight / 2 - balon.arriba <= Jugadores.obtener[1].arriba + window.innerHeight / 2) {
					if (window.innerWidth / 2 + balon.izquierda * -1 >= window.innerWidth - 88) {
						moverHacia[0] == 0? moverHacia[0] = 1: moverHacia[0] = 0
					}
					if (window.innerWidth / 2 + balon.izquierda * -1 >= window.innerWidth - 58) {
						moverHacia[0] == 0? moverHacia[0] = 1: moverHacia[0] = 0
					}
			}
		}, 50)
	})
}

function reiniciar() {
	Jugadores.reiniciar()
	$balon.style.visibility = 'hidden'
	clearInterval(intervalo)
	esperar(50).then(iniciar)
}

function esperar(milisegundos) {
	return new Promise(resolver => setTimeout(resolver, milisegundos))
}

function obtenerPixeles(texto) {
	texto = texto.replace('calc', '')
	texto = texto.replace('(', '')
	texto = texto.replace('50%', '')
	texto = texto.replace(' - ', '')
	texto = texto.replace('px', '')
	texto = texto.replace(')', '')
	return texto
}

function numeroAleatorio(minimo, maximo) {
	return Math.round(Math.random() * (maximo - minimo)) + minimo
}