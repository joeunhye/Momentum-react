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
	const getBg = () => {
		const bgimgs = localStorage.getItem("bg");
		return bgimgs ? JSON.parse(bgimgs) : [];
	};
	const [localFiles, setlocalFiles] = useState(getBg);
	const [user, setUser] = useState();
	const [backgrounds, setBackgrounds] = useState();
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

		const bgUrls = localFiles.map(file => file.secure_url);
		setBackgrounds(bgUrls);
	}, [localFiles]);

	const randomBg = () => {
		return backgrounds?.length ? backgrounds[Math.floor(Math.random() * backgrounds.length)] : `images/${bg[Math.floor(Math.random() * bg.length)]}`;
	};

	return (
		<section className={styles.container} style={{ backgroundImage: `url(${randomBg()})` }}>
			<Weather />
			<Clock />
			{!user ? <UserForm handleSubmit={handleSubmit} handleChange={handleChange} /> : <Greetings user={user} />}
			<Quotes />
			<TodoList />
			<Set localFiles={localFiles} setlocalFiles={setlocalFiles} />
		</section>
	);
}
