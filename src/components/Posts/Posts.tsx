import React, {FC} from 'react';

import {Alert, AlertTitle} from "@mui/material";

import { Post, PostProps } from '../Post';
import { IPost } from '../../@types/ipost';
import { IUser } from '../../@types/user';

interface PostComponentProps {
	status: "idle" | "pending" | "succeeded" | "failed";
	posts: IPost[],
	user?: IUser;
}

export const Posts:FC<PostComponentProps> = ({status, posts, user}) => {
	switch (status) {
		case "idle":
			return (
				<>
					{[...Array(5)].map((_, i) => (
						<Post
							key={i}
							isLoading={true}
						/>
					))}
				</>
			);
		case "pending":
			return (
				<>
					{[...Array(5)].map((_, i) => (
						<Post
							key={i}
							isLoading={true}
						/>
					))}
				</>
			);
		case "succeeded":
			return (
				<>
					{posts.map((post) => {
						const isEditable = (user?.userRole === "Admin" ? true : ((post?.meta?.author?._id || '') === user?._id)) ;
						return (<Post
							key={post._id}
							id={post._id}
							title={post.title}
							imageUrl={post.imageUrl}
							createdAt={post.createdAt}
							meta={{
								views: post?.meta?.views,
								favs: post?.meta?.favs,
								author: post?.meta?.author,
							}}
							comments={post.comments}
							tags={post.tags}
							isEditable={isEditable}
							isLoading={false}
						/>)
					})}
				</>
			);
		case "failed":
			return (
				<>
					<Alert variant="filled" severity="error">
						<AlertTitle>Error!</AlertTitle>
						Couldn't get an articles! <br />
						<strong>Please contact the admin <a href="mailto:healthheaven@admin.com">healthheaven@admin.com</a></strong>
					</Alert>
				</>
			)
		default:
			return (
				<>
					<Alert variant="filled" severity="error">
						<AlertTitle>Error!</AlertTitle>
						Something went wrong when fetching data from the server! <br />
						<strong>Please contact the admin <a href="mailto:healthheaven@admin.com">healthheaven@admin.com</a></strong>
					</Alert>
				</>
			)
	}
};
