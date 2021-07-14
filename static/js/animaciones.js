document.addEventListener('DOMContentLoaded', () => {
	const $header = document.querySelector('body header')
	$header.onmouseover = () => {if (! $header.classList.contains('activo')) $header.classList.add('activo')}
	$header.onmouseleave = () => {if ($header.classList.contains('activo')) $header.classList.remove('activo')}
})