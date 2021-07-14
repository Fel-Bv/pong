import Jugadores from "./jugador.js";

const jugadores = Jugadores.obtener
const eventos = {
	'w': jugadores[0].moverHacia['arriba'],
	's': jugadores[0].moverHacia['abajo'],

	'arrowup': jugadores[1].moverHacia['arriba'],
	'arrowdown': jugadores[1].moverHacia['abajo'],
}

export default function iniciarEventos() {
	document.addEventListener('keydown', evento => {
		try {
			eventos[evento.key.toLowerCase()]()
		}
		catch {}
	})

	document.querySelector('section[name="controles-1"] .arriba').onclick = eventos['w']
	document.querySelector('section[name="controles-1"] .abajo').onclick = eventos['s']

	document.querySelector('section[name="controles-2"] .arriba').onclick = eventos['arrowup']
	document.querySelector('section[name="controles-2"] .abajo').onclick = eventos['arrowdown']
}