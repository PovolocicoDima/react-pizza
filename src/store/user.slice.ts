import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { loadState } from './storage';

export const JWT_PERSISTANT_STATE = 'userData';

export interface IUserPersistantState {
    jwt: string | null
}

export interface IUserState {
    jwt: string | null;
}

const initialState: IUserState = {
	jwt: loadState<IUserPersistantState>(JWT_PERSISTANT_STATE)?.jwt ?? null
};

export const userSlice = createSlice({
	reducers: {
		addJwt: (state, action: PayloadAction<string>) => {
			state.jwt = action.payload;
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