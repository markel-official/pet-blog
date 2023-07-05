import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { RootState } from "../store";
import { stat } from "fs";

import { IUser } from './../../@types/user';
import { SerializedError } from "../../@types/error";

interface UserData {
	nickname?: string;
	email: string;
	password: string;
}

export const fetchLoginUser = createAsyncThunk(
	"user/fetchLoginUser",
	async (userData: UserData, thunkAPI) => {
		try {
			const { data } = await axios.post('/login', userData);
			return data;
		} catch (error: any) {
			if (error && error?.response && error?.response?.data) {
				const errorPayload: SerializedError = error.response.data;
				return thunkAPI.rejectWithValue(errorPayload);
			} else {
				return error;
			}
			// const errorPayload: SerializedError = error.response.data;
			// return thunkAPI.rejectWithValue(errorPayload)
		}
	},
	{
		condition: (_, { getState }) => {
			const { user } = getState() as any;
			const fetchStatus = user.loading;
			if (fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
				// Already fetched or in progress, don't need to re-fetch
				return false
			}
		},
	}
);

export const fetchAuthUser = createAsyncThunk(
	"user/fetchAuthUser",
	async (_, thunkAPI) => {
		try {
			const { data } = await axios.get('/auth');
			return data;
		} catch (error: any) {
			if (error && error?.response && error?.response?.data) {
				const errorPayload: SerializedError = error.response.data;
				return thunkAPI.rejectWithValue(errorPayload);
			} else {
				return error;
			}
		}
	},
	{
		condition: (_, { getState }) => {
			const { user } = getState() as any;
			const fetchStatus = user.loading;
			if (fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
				// Already fetched or in progress, don't need to re-fetch
				return false
			}
		},
	}
);

export const fetchRegisterUser = createAsyncThunk(
	"user/fetchRegisterUser",
	async (userData: UserData, thunkAPI) => {
		try {
			const { data } = await axios.post("sign-up", userData);
			return data;
		} catch (error: any) {
			if(error && error?.response && error?.response?.data) {
				const errorPayload: SerializedError = error.response.data;
				return thunkAPI.rejectWithValue(errorPayload)
			} else {
				return error
			}
		}
	},
	{
		condition: (_, {getState}) => {
			const {user} = getState() as any;
			const fetchStatus = user.loading;
			if(fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
				return false;
			}
		}
	}
)

export interface IUserState {
	userData: IUser;
	isAuth: boolean,
	loading: "idle" | "pending" | "succeeded" | "failed";
	errorMsg: string;
}

const initialState: IUserState = {
	isAuth: false,
	loading: "idle",
	userData: {},
	errorMsg: "",
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetUserStatus: (state) => {
			state.loading = "idle";
		},
		logoutUser: (state) => {
			state.isAuth = false;
			state.loading = "idle";
			state.userData = {};
		},
	},
	extraReducers: (builder) => {
		builder
			// fetchLoginUser
			.addCase(fetchLoginUser.pending, (state) => {
				state.isAuth = false;
				state.loading = "pending";
				state.errorMsg = "";
			})
			.addCase(fetchLoginUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = "succeeded";
				state.userData = action.payload;
				state.errorMsg = "";
				// state.userData._id = action.payload._id;
				// state.userData.email = action.payload.email;
				// state.userData.userRole = action.payload.userRole;
				// state.userData.token = action.payload.token;
				// state.userData.avatarUrl = action.payload?.avatarUrl || 'https://sun9-30.userapi.com/impg/nGjC8M_-u3U7FZWRcQ4147o8CdaKgs42wV7T-g/2Cc3njYS0xg.jpg?size=1920x1920&quality=95&sign=1e8c55a0008eeb65e131ee5f07722b3d&type=album';
			})
			.addCase(fetchLoginUser.rejected, (state, action) => {
				state.isAuth = false;
				state.loading = "failed";
				state.userData = {};
				// @ts-ignore
				if(action?.payload?.message) {
					// @ts-ignore 
					if(typeof action?.payload?.message === "object") {
						// @ts-ignore 
						state.errorMsg = JSON.stringify(action?.payload?.message);
					} else {
						// @ts-ignore 
						state.errorMsg = action?.payload?.message;
					}
				} else {
					state.errorMsg = ""
				}
			})
			// fetchAuthUser
			.addCase(fetchAuthUser.pending, (state) => {
				state.isAuth = false;
				state.loading = "pending";
				state.errorMsg = "";
			})
			.addCase(fetchAuthUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = "succeeded";
				state.userData = action.payload;
				state.errorMsg = "";
			})
			.addCase(fetchAuthUser.rejected, (state, action) => {
				state.isAuth = false;
				state.loading = "failed";
				state.userData = {};
				// @ts-ignore
				if(action?.payload?.message) {
					// @ts-ignore 
					if(typeof action?.payload?.message === "object") {
						// @ts-ignore 
						state.errorMsg = JSON.stringify(action?.payload?.message);
					} else {
						// @ts-ignore 
						state.errorMsg = action?.payload?.message;
					}
				} else {
					state.errorMsg = ""
				}
			})
			// fetchRegisterUser
			.addCase(fetchRegisterUser.pending, (state) => {
				state.isAuth = false;
				state.loading = "pending";
				state.errorMsg = "";
			})
			.addCase(fetchRegisterUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.loading = "succeeded";
				state.userData = action.payload;
				state.errorMsg = "";
			})
			.addCase(fetchRegisterUser.rejected, (state, action) => {
				state.isAuth = false;
				state.loading = "failed";
				state.userData = {};
				// @ts-ignore
				if(action?.payload?.message) {
					// @ts-ignore 
					if(typeof action?.payload?.message === "object") {
						// @ts-ignore 
						state.errorMsg = JSON.stringify(action?.payload?.message);
					} else {
						// @ts-ignore 
						state.errorMsg = action?.payload?.message;
					}
				} else {
					state.errorMsg = ""
				}
			})
	}
});

export const selectUserStatus = (state: RootState): IUserState["loading"] => state.user.loading;
export const selectUserAuth = (state: RootState): IUserState["isAuth"] => state.user.isAuth;
export const selectUserData = (state: RootState): IUserState["userData"] => state.user.userData;
export const selectUserErrorMsg = (state: RootState): IUserState["errorMsg"] => state.user.errorMsg;

export const { resetUserStatus, logoutUser } = userSlice.actions;

export default userSlice.reducer;

