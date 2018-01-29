'use strict';

function getTime() {
	const now = new Date();
	let ss = now.getSeconds();
		if (ss < 10) ss = '0' + ss;
	let mm = now.getMinutes();
		if (mm < 10) mm = '0' + mm;
	let hh = now.getHours();
		if (hh < 10) hh = '0' + hh;

	return `${hh}:${mm}:${ss}`;
}

const clock = document.querySelector('#current-time');

setInterval( () => {
	clock.innerHTML = getTime();
}, 1000);

