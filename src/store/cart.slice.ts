import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CartItem {
    count: number;
    id: number;
}

export interface cartState {
	items: CartItem[]
}

export const initialState: cartState = {
	items: []
};

export const cartSlice = createSlice({
	reducers: {
		addItem: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload); 
			if (!existed) {
				state.items.push({ id: action.payload, count : 1});
			} else {
				state.items.map(i => {
					if (i.id === action.payload) {
						return i.count += 1;
					} else {
						return i;
					}
				});
			}
		}
	},
	// extraReducers: (builder) => {

	// },
	name: 'cart',
	initialState
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;