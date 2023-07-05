import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { logoutUser } from "../../redux/slices/userSlice";

import {
	selectUserAuth,
	selectUserData,
	selectUserStatus,
} from "../../redux/slices/userSlice";

import clsx from "clsx";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { BurgerButton } from "../BurgerButton/BurgerButton";
import { CloseButton } from "../CloseButton/CloseButton";
import { Logo } from "../../SVG/Logo/Logo";

import styles from "./Header.module.scss";

const backToTop = () => {
	window.scrollTo(0, 0);
};

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

export const Header = () => {
	const dispatch: AppDispatch = useDispatch();
	const isAuth = useSelector(selectUserAuth);
	const status = useSelector(selectUserStatus);
	const isLoading = status === "pending" || status === "failed";

	const { nickname, avatarUrl, userRole, _id } = useSelector(selectUserData);

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const onClickLogout = () => {
		const confirmed = window.confirm(`Are you sure you want to logout?`);
		if(confirmed) {
			dispatch(logoutUser());
			localStorage.removeItem('_hh_token')
		}
	};

	// const user = {
	// 	nickname: "John Doe",
	// 	avatarUrl:
	// 		"https://sun9-east.userapi.com/sun9-76/impg/QwvOTAQzVY5uAy_bqka98uj4_q_e4hd2bGpXYg/7pKVgXq5loo.jpg?size=210x210&quality=96&sign=fa72cbd20c02f43013902e8cc9d8e66b&type=album",
	// };

	return (
		<header className={styles.root}>
			<Container maxWidth="lg">
				<div className={styles.inner}>
					<Link to="/" className={styles.logo} onClick={backToTop}>
						<Logo className={styles.logoSvg} />
					</Link>

					<BurgerButton
						onClick={() => setIsMobileMenuOpen(true)}
					></BurgerButton>

					<nav
						className={clsx(
							styles.menu,
							isMobileMenuOpen ? styles["menu--open"] : ``
						)}
					>
						<div
							className={styles.menuOverlay}
							onClick={() => setIsMobileMenuOpen(false)}
						></div>

						<div className={styles.menuWrapper}>
							<div className={styles.buttons}>
								{isAuth ? (
									<>
										<Link
											to="/profile"
											className={styles.profileWrapper}
											onClick={backToTop}
										>
											<ListItemAvatar sx={{
												marginRight: "16px"
											}}>
												{isLoading ? (
													<Skeleton variant="circular" width={40} height={40} />
												) : (
													<Avatar alt={nickname} src={avatarUrl} />
												)}
											</ListItemAvatar>
											{isLoading ? (
												<div
													style={{ display: "flex", flexDirection: "column" }}
												>
													<Skeleton variant="text" height={25} width={120} />
												</div>
											) : (
												<ListItemText primary={nickname} />
											)}
										</Link>
										{
											(userRole === "Admin" || userRole === "Editor") ? (
											<>
												<Link to="/create-post" onClick={backToTop}>
													<Button variant="contained">Create new post</Button>
												</Link>
											</>
											) : null
										}
										<Button
											onClick={onClickLogout}
											variant="contained"
											color="error"
										>
											Logout
										</Button>
									</>
								) : (
									<>
										<Link to="/login" onClick={backToTop}>
											<Button variant="outlined">Login</Button>
										</Link>
										<Link to="/signup" onClick={backToTop}>
											<Button variant="contained">Sign up</Button>
										</Link>
									</>
								)}
							</div>

							<CloseButton
								className="menu-close-btn"
								onClick={() => setIsMobileMenuOpen(false)}
							></CloseButton>
						</div>
					</nav>
				</div>
			</Container>
		</header>
	);
};

