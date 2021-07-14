class Jugador {
	constructor(elemento = HTMLElement.prototype) {
		this.elemento = elemento
		this.elementoPuntaje

		const id = this.elemento.id.replace('jugador-', '')
		this.elementoPuntaje = document.getElementById(`puntaje-jugador-${id}`)
	}

	aumentarPuntaje() {
		this.elementoPuntaje.innerText = this.puntaje + 1
	}

	get puntaje() {
		return parseInt(this.elementoPuntaje.innerText)
	}

	get arriba() {
		if (! this.elemento.style.top) return parseInt(window.innerHeight * .25)
		return parseInt(obtenerPixeles(this.elemento.style.top))
	}

	get moverHacia() {
		return {
			arriba: () => this.elemento.style.top = `${this.arriba - 15}px`,
			abajo: () => this.elemento.style.top = `${this.arriba + 15}px`,
		}
	}
}

export default class Jugadores {
	static get obtener() {
		const $jugador = [
			document.querySelector('div[name="jugador-1"]'),
			document.querySelector('div[name="jugador-2"]'),
		]

		return [
			new Jugador($jugador[0]),
			new Jugador($jugador[1]),
		]
	}

	static reiniciar() {
		Jugadores.obtener[0].elemento.style.top = `${window.innerHeight * .25}px`
		Jugadores.obtener[1].elemento.style.top = `${window.innerHeight * .25}px`
	}
}



function obtenerPixeles(texto) {
	return texto.replace('px', '')
}