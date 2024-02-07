import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { LoginResponse } from '../interfaces/auth.interface';
import { PREFIX } from '../helpers/API';
import { loadState } from './storage';

export const JWT_PERSISTANT_STATE = 'userData';

export interface IUserPersistantState {
    jwt: string | null
}

export interface IUserState {
    loginErrorMessage?: string
    jwt: string | null;
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