import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

import { fetchPostById, selectPostStatus, selectPostItems } from "../redux/slices/postSlice";
import { selectUserData } from "../redux/slices/userSlice";
import { IPost } from "../@types/ipost";
import { IUser } from "../@types/user";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

type AppDispatch = ThunkDispatch<any, any, AnyAction>;

interface RouteParams extends Record<string, string> {
	postId: string;
}

interface PostComponentProps {
	status: "idle" | "pending" | "succeeded" | "failed";
	posts: IPost[];
	user?: IUser;
}
const PostComponent: FC<PostComponentProps> = ({ status, posts, user }) => {
	switch (status) {
		case "idle":
    case "pending":
      return (
        <Post
          key={status}
          isLoading={true}
          isFullPost
        />
      );
    case "succeeded": {
      const post = posts[0];
			const isEditable = (user?.userRole === "Admin" ? true : ((post?.meta?.author?._id || '') === user?._id)) ;
      return (
        <Post
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
        >
          <p>
            {post.content}
          </p>
        </Post>
      );
    }
		case "failed":
			return (
				<>
					<Alert variant="filled" severity="error">
						<AlertTitle>Error!</AlertTitle>
						Couldn't get an articles! <br />
						<strong>
							Please contact the admin{" "}
							<a href="mailto:healthheaven@admin.com">healthheaven@admin.com</a>
						</strong>
					</Alert>
				</>
			);
		default:
			return (
				<>
					<Alert variant="filled" severity="error">
						<AlertTitle>Error!</AlertTitle>
						Something went wrong when fetching data from the server! <br />
						<strong>
							Please contact the admin{" "}
							<a href="mailto:healthheaven@admin.com">healthheaven@admin.com</a>
						</strong>
					</Alert>
				</>
			);
	}
};

export const FullPost: FC = () => {
	const dispatch: AppDispatch = useDispatch();

	const { postId } = useParams<RouteParams>();
	const postIdString = postId as string;

  const status = useSelector(selectPostStatus);
  const posts = useSelector(selectPostItems);

	// Select user's data
	const userData = useSelector(selectUserData);

  const isLoading = (status === "pending" || status ===  "idle" ) ? true : false;

	useEffect(() => {
		dispatch(fetchPostById(postIdString));
		return () => {};
	}, []);

	return (
		<>
      <PostComponent status={status} posts={posts} user={userData}></PostComponent>
			<CommentsBlock
				status={status}
        comments={(posts[0]?.comments ?? [])}
				isLoading={isLoading}
			>
				<Index />
			</CommentsBlock>
		</>
	);
};

