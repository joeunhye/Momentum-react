import React from "react";
import styles from "./TodoHeader.module.css";

export default function TodoHeader({ filters, filter, setFilter }) {
	return (
		<ul className={styles.filter}>
			{filters.map((filterItem, idx) => (
				<li key={idx}>
					<button className={`${styles.filterBtn} ${filter === filterItem && styles.selected}`} onClick={() => setFilter(filterItem)}>
						{filterItem}
					</button>
				</li>
			))}
		</ul>
	);
}
