export function onGeoOk(position) {
	const { latitude, longitude } = position.coords;
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
	return fetch(url) //
		.then(response => response.json()) //
		.then(data => {
			const weather = data.weather[0].main;
		});
}

export function onGeoError() {
	alert("Can't find you. 😢");
}
