import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BiMessageRoundedDots } from "react-icons/bi";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";
import AddTodo from "../addTodo/AddTodo";
import TodoHeader from "./TodoHeader";

const filters = ["all", "active", "completed"];
function getFilterItem(todos, filter) {
	if (filter === "all") return todos;
	return todos.filter(todo => todo.status === filter);
}
function getTodos() {
	const todos = localStorage.getItem("todos");
	return todos ? JSON.parse(todos) : [];
}
export default function TodoList() {
	const [filter, setFilter] = useState(filters[0]);
	const [todos, setTodos] = useState(getTodos);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleAdd = todo => {
		setTodos(prev => [...prev, todo]);
	};
	const handleDelete = todo => {
		setTodos(todos.filter(item => item.id !== todo.id));
	};
	const handleUpdate = todo => {
		setTodos(todos.map(item => (item.id === todo.id ? todo : item)));
	};
	const handleEdit = todo => {
		setTodos(todos.map(item => (item.id === todo.id ? todo : item)));
	};

	const filteredItem = getFilterItem(todos, filter);

	const onDragStart = () => {};
	const onDragEnd = result => {
		const { destination, source, draggableId } = result;
		if (!destination) return;
		if (destination.droppableId === source.droppableId && source.index === destination.index) return;
		const newTodos = todos;
		const [reorderedItem] = newTodos.splice(source.index, 1);
		newTodos.splice(destination.index, 0, reorderedItem);
		setTodos(newTodos);
	};

	const handleActive = () => {
		setIsActive(state => !state);
	};

	return (
		<div className={styles.todo}>
			<div className={`${styles.list} ${isActive && styles.active}`}>
				<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
					<h2 className={styles.title}>To Do List</h2>
					<TodoHeader filters={filters} filter={filter} setFilter={setFilter} />
					<Droppable droppableId="to-do">
						{provided => (
							<ul {...provided.droppableProps} ref={provided.innerRef} className={styles.listItems}>
								{filteredItem.map((todo, idx) => (
									<TodoItem key={idx} keyId={idx} todo={todo} onUpdate={handleUpdate} onEdit={handleEdit} onDelete={handleDelete} />
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
					<AddTodo onAdd={handleAdd} />
				</DragDropContext>
			</div>
			<button className={styles.todoBtn} onClick={handleActive}>
				<BiMessageRoundedDots />
			</button>
		</div>
	);
}
