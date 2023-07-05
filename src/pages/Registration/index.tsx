import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	fetchRegisterUser,
	selectUserStatus,
	selectUserAuth,
	selectUserErrorMsg,
	resetUserStatus,
} from "../../redux/slices/userSlice";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Modal, Alert, AlertTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";

import styles from "./Login.module.scss";

const useStyles = makeStyles(() => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// textAlign: "center",
	},
	paper: {
		flex: "0 1 600px",
		border: "none",
		borderRadius: "10px",
		padding: "30px 20px",
		width: "600px",
		maxWidth: "90vw",
		boxShadow: "0 0 7px 5px rgba(33, 33, 33, 0.2)",
		backgroundColor: "#fff",
	},
	title: {
		fontSize: "24px",
		marginBottom: "16px",
		fontWeight: "bold",
	},
	caption: {
		fontSize: "20px",
		marginBottom: "24px",
	},
	button: {
		textAlign: "center",
		display: "flex",
		width: "100%",
	},
}));

type RegistrationFormInputs = {
	nickname: string;
	email: string;
	password: string;
};

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

export const Registration = () => {
	const customClasses = useStyles();

	const dispatch: AppDispatch = useDispatch();

	const userFetchStatus = useSelector(selectUserStatus);
	const isUserAuth = useSelector(selectUserAuth);
	const errorMsg = useSelector(selectUserErrorMsg);

	const [isErrorModalOpen, setIsErrorModalOpen] = useState(
		userFetchStatus === "failed"
	);

	useEffect(() => {
		setIsErrorModalOpen(userFetchStatus === "failed");
	}, [userFetchStatus]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<RegistrationFormInputs>({
		defaultValues: {
      nickname: "",
			email: "",
			password: "",
			// nickname: "qwerty",
			// email: "qwerty1@mail.ru",
			// password: "qwerty",
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
		try {
			const userData = await dispatch(fetchRegisterUser(data)).unwrap();
			if (!userData.token) {
				return;
			}
			localStorage.setItem("_hh_token", userData.token);
		} catch (err) {
			console.log(`Couldn't register`);
			console.log(err);
		}
	};

	const handleClose = () => {
		setIsErrorModalOpen(false);
		reset();
		dispatch(resetUserStatus());
	};

	if (isUserAuth) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<>
			<Paper classes={{ root: styles.root }} elevation={1}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Typography classes={{ root: styles.title }} variant="h5">
						Create an account
					</Typography>
					<div className={styles.avatar}>
						<Avatar sx={{ width: 100, height: 100 }} />
					</div>
					<TextField
						className={styles.field}
						label="Nickname"
						{...register("nickname", {
							required: "Enter a nickname",
							minLength: {
								value: 2,
								message: `Length must be greater than 2 symbols`,
							},
							maxLength: {
								value: 256,
								message: `Length must be less than 256 symbols`,
							},
						})}
						error={!!errors.nickname}
						helperText={errors.nickname?.message}
						fullWidth
					/>
					<TextField
						className={styles.field}
						label="E-Mail"
						type="email"
						{...register("email", {
							required: "Enter an email",
							minLength: {
								value: 2,
								message: `Length must be greater than 2 symbols`,
							},
							maxLength: {
								value: 256,
								message: `Length must be less than 256 symbols`,
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: `Must be a valid email address`,
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
						fullWidth
					/>
					<TextField
						className={styles.field}
						label="Password"
						{...register("password", {
							required: "Enter a password",
							minLength: {
								value: 6,
								message: `Length must be greater than 6 symbols`,
							},
							maxLength: {
								value: 256,
								message: `Length must be less than 256 symbols`,
							},
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
						fullWidth
					/>
					<Button type="submit" size="large" variant="contained" fullWidth>
						Sign up
					</Button>
				</form>
			</Paper>
			<Modal
				open={isErrorModalOpen}
				onClose={handleClose}
				aria-labelledby="Error while logging in"
				aria-describedby={`${errorMsg}`}
				className={customClasses.modal}
			>
				<div className={customClasses.paper}>
					<Alert
						severity="error"
						variant="filled"
						className={customClasses.title}
					>
						<AlertTitle id="modal-title">Registration error</AlertTitle>
						<p id="modal-description">{errorMsg}</p>
					</Alert>
					<Button
						className={customClasses.button}
						variant="outlined"
						onClick={handleClose}
					>
						Retry
					</Button>
				</div>
			</Modal>
		</>
	);
};

