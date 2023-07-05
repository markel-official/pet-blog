import React, {FC} from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { fetchAuthUser } from "./redux/slices/userSlice";

import Container from "@mui/material/Container";

import { Header, Footer } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Profile } from "./pages";
import { useEffect } from "react";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

function App () {
	const dispatch:AppDispatch = useDispatch();

	useEffect(() => {
		const token = localStorage.getItem("_hh_token");
		if (token) {
			// Fetch auth only if we have a token!
			dispatch(fetchAuthUser());
		}
	}, [])

	return (
		<>
			<Header />
			<div className="content-wrapper">
				<Container className="main-content" maxWidth="lg">
					<Routes>
						<Route path="/" element={<Home></Home>}></Route>
						<Route path="/posts/:postId" element={<FullPost></FullPost>}></Route>
						<Route path="/create-post" element={<AddPost></AddPost>}></Route>
						<Route path="/profile" element={<Profile></Profile>}></Route>
						<Route path="/login" element={<Login></Login>}></Route>
						<Route path="/signup" element={<Registration></Registration>}></Route>
						{/* TODO: Add "terms and services" page */}
					</Routes>
				</Container>
				<Footer className="footer"></Footer>
			</div>
		</>
	);
}

export default App;

