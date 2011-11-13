var	background = document.body.style,
	clock,
	seconds,
	minutes,
	hours;

if (typeof Array.prototype.map !== "function") {
	Array.prototype.map = function (callback) {
		var r = [],
			length = this.length;

		for (var i = 0; i < length; i++) {
			r.push(callback(this[i]));
		}
		return r;
	};
}


function $ (id) {
	return document.getElementById(id);
}

function init () {
	clock = $("clock");
	seconds = $("seconds");
	minutes = $("minutes");
	hours = $("hours");

	document.body.removeChild ($("message"));

	tick ();
	setInterval (tick, 500);
}

function normalise (scalar, maxValue, divisions) {
	return parseFloat(scalar, 10) * maxValue / divisions;
}

function getBackgroundColor (h, m, s) {
	h = normalise (h, 255, 24);
	m = normalise (m, 255, 60);
	s = normalise (s, 255, 60);
	var time = [h, m, s].map (stringify);
	return "rgb(" + time.join(",") + ")";
}

function stringify (number) {
	number = ~~number;
	if (number < 10) {
		number = "0" + number;
	}
	return number;
}

function tick () {
	var time = new Date(),
		s = time.getSeconds (),
		m = time.getMinutes (),
		h = time.getHours ();
	hours.innerHTML = stringify(h);
	minutes.innerHTML = stringify(m);
	seconds.innerHTML = stringify(s);

	document.body.style.backgroundColor = getBackgroundColor (h, m, s);
}


init ();
