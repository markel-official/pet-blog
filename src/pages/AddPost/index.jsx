import React from "react";
import SimpleMDE from "react-simplemde-editor";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUserData, selectUserAuth } from "../../redux/slices/userSlice";

import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";

const uniqueId = `my-editor-1`;

export const AddPost = () => {
	const isAuth = useSelector(selectUserAuth);

	const imageUrl = "";
	const [value, setValue] = React.useState("");

	const handleChangeFile = () => {};

	const onClickRemoveImage = () => {};

	const onChange = React.useCallback((value) => {
		setValue(value);
	}, []);

	const options = React.useMemo(
		() => ({
			spellChecker: true,
			maxHeight: "400px",
			autofocus: true,
			placeholder: "Enter text...",
			status: false,
			autosave: {
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	if (!isAuth) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<Paper style={{ padding: 30 }} elevation={1}>
			<Button variant="outlined" size="large">
				Upload a preview
			</Button>
			<input type="file" onChange={handleChangeFile} hidden />
			{imageUrl && (
				<Button variant="contained" color="error" onClick={onClickRemoveImage}>
					Delete
				</Button>
			)}
			{imageUrl && (
				<img
					className={styles.image}
					src={`http://localhost:7777${imageUrl}`}
					alt="Uploaded"
				/>
			)}
			<br />
			<br />
			<TextField
				classes={{ root: styles.title }}
				variant="standard"
				placeholder="Title..."
				fullWidth
			/>
			<TextField
				classes={{ root: styles.tags }}
				variant="standard"
				placeholder="Tags"
				fullWidth
			/>
			{/* TODO: Add a debounce function for onChange function */}
			<SimpleMDE
				className={styles.editor}
				value={value}
				onChange={onChange}
				options={options}
				id={uniqueId}
			/>
			<div className={styles.buttons}>
				<Button size="large" variant="contained">
					Puiblish
				</Button>
				<Link to="/">
					<Button size="large">Cancel</Button>
				</Link>
			</div>
		</Paper>
	);
};

