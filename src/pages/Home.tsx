import React, { useState, useEffect, FC } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import {
	fetchAllPosts,
	selectPostStatus,
	selectPostItems,
	selectPostTags,
} from "../redux/slices/postSlice";

import { selectUserData } from "../redux/slices/userSlice";


import { Posts } from "../components/Posts/Posts";
import { TagsBlock } from "../components/TagsBlock";
import { SocialNetworksWidget } from "../components/SocialNetworksWidget/SocialNetworksWidget";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

export const Home:FC = () => {
	const dispatch:AppDispatch = useDispatch();

	// Select post data
	const status = useSelector(selectPostStatus);
	const posts = useSelector(selectPostItems);
	const tags = useSelector(selectPostTags);

	// Select user's data
	const userData = useSelector(selectUserData);
	
	const isLoading = (status === "pending" || status ===  "idle" ) ? true : false;

	useEffect(() => {
		// Fetch all posts
		const promise = dispatch(fetchAllPosts());

		return () => {
			promise.abort();
		};
	}, []);

	return (
		<>
			<Tabs
				style={{ marginBottom: 15 }}
				value={0}
				aria-label="basic tabs example"
			>
				<Tab label="New" />
				<Tab label="Popular" />
			</Tabs>
			<Grid container spacing={4}>
				<Grid xs={12} md={8} item>
					<Posts status={status} posts={posts} user={userData} />
				</Grid>
				<Grid xs={12} md={4} item>
					<Container
						className="sticky-sidebar"
						sx={{
							position: "relative",
							"@media (min-width: 900px)": {
								position: ["-webkit-sticky", "sticky"],
								top: "65px",
							},
							"@media (max-width: 900px)": {
								padding: 0,
							},
						}}
					>
						<TagsBlock
							items={tags}
							isLoading={isLoading}
						/>
						<div className="socialNetworksBlock">
							<SocialNetworksWidget key="socialWidgetParent1"></SocialNetworksWidget>
						</div>
					</Container>
				</Grid>
			</Grid>
		</>
	);
};

