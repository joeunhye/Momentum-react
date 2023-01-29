import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./TodoItem.module.css";
import { BiMessageSquareX, BiMessageSquareEdit, BiMessageSquareCheck } from "react-icons/bi";

export default function TodoItem({ keyId, todo, onUpdate, onDelete, onEdit }) {
	const { text, status, id } = todo;
	const [isEditing, setEditing] = useState(false);
	const [editedText, setEditedText] = useState(text);
	const inpRef = useRef();

	const handleChange = e => {
		const status = e.target.checked ? "completed" : "active";
		onUpdate({ ...todo, status });
	};
	const handleDelete = () => {
		onDelete(todo);
	};
	const handleEdit = e => {
		setEditedText(e.target.value);
	};
	const handleSubmit = () => {
		setEditing(false);
		onEdit({ ...todo, text: editedText });
	};
	const clickEdit = () => {
		setEditing(true);
		setTimeout(() => {
			inpRef.current.focus();
		}, 100);
	};
	if (isEditing) {
		return (
			<Draggable draggableId={keyId.toString()} index={keyId}>
				{(provided, snapshot) => (
					<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
						<form className={styles.form}>
							<input type="text" ref={inpRef} className={styles.editInp} value={editedText} onChange={handleEdit} />
							<button className={styles.button} onClick={handleSubmit}>
								<BiMessageSquareCheck />
							</button>
						</form>
					</li>
				)}
			</Draggable>
		);
	} else {
		return (
			<Draggable draggableId={keyId.toString()} index={keyId}>
				{(provided, snapshot) => (
					<li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
						<div>
							<input type="checkbox" id={`checkbox${id}`} onChange={handleChange} checked={status === "completed"} />
							<label htmlFor={`checkbox${id}`} className={styles.todoText}>
								{text}
							</label>
						</div>
						<div className={styles.buttonBox}>
							<button className={styles.button} onClick={clickEdit}>
								<BiMessageSquareEdit />
							</button>
							<button className={styles.button} onClick={handleDelete}>
								<BiMessageSquareX />
							</button>
						</div>
					</li>
				)}
			</Draggable>
		);
	}
}
