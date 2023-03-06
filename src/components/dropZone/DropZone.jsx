import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styles from "./DropZone.module.css";
import { useDropzone } from "react-dropzone";
import Thumbs from "../thumbs/Thumbs";
import ImgList from "../imgList/ImgList";

const DropZone = ({ localFiles, setlocalFiles }) => {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [uploadCheck, setUploadCheck] = useState(false);
	const [error, setError] = useState(false);
	const [errorImgLength, setErrorImgLength] = useState(0);

	//이미지 파일 드래그 앤 드롭 영역
	const onDrop = useCallback(acceptedFiles => {
		setFiles(
			acceptedFiles.map(file =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			"image/*": [],
		},
		onDrop,
	});

	useEffect(() => {
		localStorage.setItem("bg", JSON.stringify(localFiles));
		// Make sure to revoke the data uris to avoid memory leaks, will run on unmount
		return () => files.forEach(file => URL.revokeObjectURL(file.preview));
	}, [files, localFiles]);

	// 이미지 목록 갯수
	const length = localFiles.length;

	// 이미지 업로드
	const handleUpload = async () => {
		setLoading(true);
		const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`;
		const uploaders = files.map(async file => {
			const formData = new FormData();
			const config = {
				header: {
					"content-type": "multipart/form-data",
				},
			};
			formData.append("file", file);
			formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

			try {
				const response = await axios.post(url, formData, config)
    			const files = response.data;
				setlocalFiles(prev => [...prev, files])
			} catch (error) {
				setErrorImgLength(prev => prev + 1)
				setError(true);
				return;
			}
		});

		await axios.all(uploaders);
		setUploadCheck(true);
		setLoading(false);
		setTimeout(() => {
			setUploadCheck(false);
		}, 1000);
		setFiles([]);
	};

	// 이미지 제거
	const handleImgRemove = file => {
		setlocalFiles(localFiles.filter(localFile => localFile.asset_id !== file.asset_id));
	};

	return (
		<section className={styles.container}>
			<div className={styles.dropzoneWrap}>
				<div {...getRootProps()} className={styles.dropzone}>
					<input {...getInputProps()} />
					<p className={styles.dropzoneText}>
						Drag 'n' drop some files here, or click to select files
						<br />
						(이미지 권장 사이즈 : 1920 * 1080)
					</p>
				</div>
				<aside className={styles.thumbsContainer}>
					{files.map(file => (
						<Thumbs file={file} files={files} key={file.name} setFiles={setFiles} />
					))}
				</aside>
				<div className={styles.dropzoneCtrl}>
					{loading && <p>업로드 중</p>}
					{error && <p>업로드 실패 ❌<br /> 업로드 실패한 이미지가 있습니다! 업로드를 다시 시도해주세요.</p>}
					{error && errorImgLength > 0 && <p className={styles.errorImgLength}>업로드 실패 이미지 개수 ({errorImgLength})</p>}
					{files.length > 0 && (
						<button className={styles.btn} onClick={handleUpload}>
							Upload
						</button>
					)}
				</div>
			</div>
			<hr />
			<h3>나의 이미지 목록 ({length})</h3>
			{localFiles.length === 0 && <p className={styles.imgEmpty}>등록된 이미지가 없습니다.</p>}
			<ul className={styles.thumbnailList}>
				{localFiles.map(file => (
					<ImgList key={file.asset_id} file={file} onDelete={handleImgRemove} />
				))}
			</ul>
		</section>
	);
};

export default DropZone;
