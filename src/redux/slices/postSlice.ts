import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from '../../axios/axios';
import { IComment } from '../../@types/icomment';
import { IPost } from '../../@types/ipost';

export interface IPostState {
	posts: IPost[];
	tags: string[];
	loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IPostState = {
	posts: [],
	tags: [],
	loading: "idle",
}

// Async thunks
export const fetchAllPosts = createAsyncThunk(
	"posts/fetchAllPosts",
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get("/posts");
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
	{
		condition: (_, { getState }) => {
			const { posts } = getState() as any;
			const fetchStatus = posts.loading;
			if (fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
				// Already fetched or in progress, don't need to re-fetch
				return false
			}
		},
	}
)



export const fetchPostById = createAsyncThunk(
	"posts/fetchPostById",
	async (postId:string, thunkAPI) => {
		try {
			const {data} = await axios.get(`posts/${postId}`);
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	},
	{
		condition: (_, { getState }) => {
			const { posts } = getState() as any;
			const fetchStatus = posts.loading;
			// const fetchStatus = posts.requests[postId];
			if (fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
				// Already fetched or in progress, don't need to re-fetch
				return false
			}
		},
	}
)

export const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllPosts.pending, (state) => {
				state.loading = "pending";
				state.posts = [];
				state.tags = [];
			})
			.addCase(fetchAllPosts.fulfilled, (state, action) => {
				// Add posts to the state array
				const { allArticles } = action.payload;
				state.posts = allArticles;
				state.loading = "succeeded";
				const tagsArray: string[] = allArticles.reduce((acc: string[], article: IPost) => {
					if(acc.length < 5) {
						if(article.tags !== undefined) {
							acc = acc.concat(article.tags)
							return acc
						}
					}
				}, [])
				state.tags = tagsArray;
			})
			.addCase(fetchAllPosts.rejected, (state) => {
				state.loading = 'failed';
				state.posts = [];
				state.tags = [];
			})
			.addCase(fetchPostById.pending, (state) => {
				state.loading = "pending";
				state.posts = [];
				state.tags = [];
			})
			.addCase(fetchPostById.fulfilled, (state, action) => {
				const { post } = action.payload;
				state.posts.push(post);
				state.loading = "succeeded";
				state.tags = [];
			})
			.addCase(fetchPostById.rejected, (state) => {
				state.loading = 'failed';
				state.posts = [];
				state.tags = [];
			})
	}
});

export const selectPostStatus = (state: RootState): IPostState['loading'] => state.posts.loading;
export const selectPostItems = (state: RootState): IPostState['posts'] => state.posts.posts;
export const selectPostTags = (state: RootState): IPostState['tags'] => state.posts.tags;

export default postSlice.reducer;
