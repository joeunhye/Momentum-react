import React, { useRef, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import styles from "./AddTodo.module.css";
import { v4 as uuidv4 } from "uuid";

export default function AddTodo({ onAdd }) {
	const [text, setText] = useState("");
	const inpRef = useRef();
	const inpIdRef = useRef(0);
	const handleChange = e => {
		setText(e.target.value);
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (text.trim().length === 0) return;
		onAdd({ id: inpIdRef.current, text, status: "active" });
		inpIdRef.current += 1;
		setText("");
		inpRef.current.focus();
	};
	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<input ref={inpRef} type="text" className={styles.input} value={text} placeholder="Add Todo" onChange={handleChange} />
			<button className={styles.button}>
				<BiMessageSquareEdit />
			</button>
		</form>
	);
}
