import React, { useState } from "react";
import styles from "./Set.module.css";
import { BiCategory } from "react-icons/bi";

export default function Set() {
	const [isActive, setIsActive] = useState(false);
	const openSetting = () => {
		setIsActive(state => !state);
	};
	return (
		<div>
			<div className={styles.setting}>
				<h3 className={styles.settingTitle}>백그라운드 이미지 업로드</h3>
			</div>
			<button className={styles.setBtn} onClick={openSetting}>
				<BiCategory />
			</button>
		</div>
	);
}
