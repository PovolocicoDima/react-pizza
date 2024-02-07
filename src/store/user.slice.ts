import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { LoginResponse } from '../interfaces/auth.interface';
import { IProfile } from '../interfaces/profile.interface';
import { PREFIX } from '../helpers/API';
import { loadState } from './storage';
import { RootState } from './store';

export const JWT_PERSISTANT_STATE = 'userData';

export interface IUserPersistantState {
    jwt: string | null
}

export interface IUserState {
    loginErrorMessage?: string
    jwt: string | null;
    profile?: IProfile
}

export const login = createAsyncThunk('user/login', async (params: {password: string, email: string}) => {
	try {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
			password: params.password,
			email: params.email
		});
    
		return data;

	} catch(e) {
		if (e instanceof AxiosError) {
			throw new Error(e.response?.data.message);
		}
	}
});

export const getProfile = createAsyncThunk<IProfile, void, {state: RootState}>('user/getProfile', async (_, thunkAPI) => {
	const jwt = thunkAPI.getState().user.jwt;
	const { data } = await axios.get<IProfile>(`${PREFIX}/user/profile`, {
		headers: {
			Authorization: `Bearer ${jwt}`
		}
	});
	return data;
});

const initialState: IUserState = {
	jwt: loadState<IUserPersistantState>(JWT_PERSISTANT_STATE)?.jwt ?? null
};

export const userSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return; 
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.loginErrorMessage = action.error.message;
		});
		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});
	},
	reducers: {
		clearLoginError: (state) => {
			state.loginErrorMessage = undefined;
		},
		logout: (state) => {
			state.jwt = null;
		}
	},
	name: 'user',
	initialState
});

export default userSlice.reducer;
export const userActions = userSlice.actions;