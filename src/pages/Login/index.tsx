import React, { useEffect, useState, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

import {
	fetchLoginUser,
	fetchAuthUser,
	selectUserStatus,
	selectUserAuth,
	selectUserData,
	selectUserErrorMsg,
	resetUserStatus,
} from "../../redux/slices/userSlice";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
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

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

type LoginFormInputs = {
	email: string;
	password: string;
};

export const Login: FC = () => {
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
	} = useForm<LoginFormInputs>({
		defaultValues: {
			email: "",
			password: "",
			// email: "joe1@gmail.com",
			// password: "12345abc",
			// email: "markelov_ser@mail.ru",
			// password: "12345abc",
		},
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
		try {
			const promiseResult = await dispatch(fetchLoginUser(data)).unwrap();

			if(!promiseResult.token) {
				return;
			}

			localStorage.setItem('_hh_token', promiseResult.token)
		} catch (error) {
			console.log(`Something went wrong`);
			// @ts-ignore
			console.log(error?.message);
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
						Login to your account
					</Typography>

					<TextField
						className={styles.field}
						label="E-Mail"
						type="email"
						{...register("email", {
							required: "Enter the email",
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
						type="password"
						label="Password"
						{...register("password", {
							required: "Enter the password",
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
						Login
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
						<AlertTitle id="modal-title">Login error</AlertTitle>
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

