import React from "react";
import { quotes } from "../../api/quotes";
import styles from "./Quotes.module.css";

export default function Quotes() {
	const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)];
	return (
		<div className={styles.quotebox}>
			<p className={styles.quote}>{quote}</p>
			<span className={styles.author}>{`- ${author}`}</span>
		</div>
	);
}
