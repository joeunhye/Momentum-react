import React, { useState } from "react";
import styles from "./Set.module.css";
import { BiCategory } from "react-icons/bi";
import DropZone from "../dropZone/DropZone";

export default function Set({ localFiles, setlocalFiles }) {
	const [isActive, setIsActive] = useState(false);
	const openSetting = () => {
		setIsActive(state => !state);
	};

	return (
		<div className={`${styles.settingBox} ${isActive && styles.active}`}>
			<div className={styles.setting}>
				<h3 className={styles.settingTitle}>백그라운드 이미지 업로드</h3>
				{/* 이미지 업로드 영역 */}
				<DropZone localFiles={localFiles} setlocalFiles={setlocalFiles} />
			</div>
			<button className={styles.setBtn} onClick={openSetting}>
				<BiCategory />
			</button>
		</div>
	);
}
