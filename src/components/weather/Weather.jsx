import React, { useEffect, useState } from "react";
import useGeolocation from "./../../hooks/useGeolocation";
import styles from "./Weather.module.css";

export default function Weather() {
	const { weather } = useGeolocation();
	const [weatherIcon, setWeatherIcon] = useState("");

	useEffect(() => {
		if (weather === "Rain") {
			setWeatherIcon("🌧");
		} else if (weather === "Thunderstorm") {
			setWeatherIcon("🌩");
		} else if (weather === "Drizzle") {
			setWeatherIcon("🌦");
		} else if (weather === "Snow") {
			setWeatherIcon("🌨");
		} else if (weather === "Atmosphere" || weather === "Haze") {
			setWeatherIcon("🌫");
		} else if (weather === "Clear") {
			setWeatherIcon("☀");
		} else if (weather === "Clouds") {
			setWeatherIcon("☁");
		}
	}, [weather]);
	return (
		<div className={styles.weather}>
			<span className={styles.weatherIcon}>{weatherIcon}</span>
			{weather}
		</div>
	);
}
