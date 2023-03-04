import { useEffect, useState } from "react";

const useGeolocation = () => {
	const [weather, setWeather] = useState("");

	const onGeoOk = position => {
		const { latitude, longitude } = position.coords;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
		fetch(url) //
			.then(response => response.json()) //
			.then(data => {
				const weather = data.weather[0].main;
				setWeather(weather);
			});
	};

	const onGeoError = () => {
		alert("Can't find you. 😢");
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
	}, []);

	return { weather };
};

export default useGeolocation;
