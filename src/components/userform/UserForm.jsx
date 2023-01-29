import React from "react";
import { BiSearch } from "react-icons/bi";
import styles from "./UserForm.module.css";

export default function UserForm({ handleChange, handleSubmit }) {
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2 className={styles.title}>Hello, what's your name?</h2>
			<div className={styles.inputbox}>
				<input type="text" className={styles.input} onChange={handleChange} />
				<button type="button" className={styles.button} onClick={handleSubmit}>
					<BiSearch />
				</button>
			</div>
		</form>
	);
}
