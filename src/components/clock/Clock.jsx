import React, { useEffect, useState } from "react";
import styles from "./Clock.module.css";

export default function Clock() {
	const [clock, setClock] = useState("00:00:00");

	const getClock = () => {
		const date = new Date();
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		const seconds = String(date.getSeconds()).padStart(2, "0");
		setClock(`${hours}:${minutes}:${seconds}`);
	};

	useEffect(() => {
		setInterval(getClock, 1000);
	}, []);

	return <div className={styles.time}>{clock}</div>;
}
