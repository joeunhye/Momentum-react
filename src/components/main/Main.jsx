import React, { useEffect, useState } from "react";
import Clock from "../clock/Clock";
import Greetings from "../greeting/Greetings";
import Quotes from "../quotes/Quotes";
import UserForm from "../userform/UserForm";
import styles from "./Main.module.css";
import { bg } from "../../api/background";
import Weather from "../weather/Weather";
import TodoList from "../todoList/TodoList";
import Set from "../set/Set";

export default function User() {
	const [user, setUser] = useState();
	let value;

	const handleChange = e => {
		value = e.target.value;
	};
	const handleSubmit = e => {
		e.preventDefault();
		setUser(value);
		localStorage.setItem("user", value);
	};

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) setUser(user);
	}, []);

	const randomBg = () => {
		return bg[Math.floor(Math.random() * bg.length)];
	};

	return (
		<section className={styles.container} style={{ backgroundImage: `url(images/${randomBg()})` }}>
			<Weather />
			<Clock />
			{!user ? <UserForm handleSubmit={handleSubmit} handleChange={handleChange} /> : <Greetings user={user} />}
			<Quotes />
			<TodoList />
			{/* <Set /> */}
		</section>
	);
}
