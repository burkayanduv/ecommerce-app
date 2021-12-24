import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserState } from '../shared/interfaces';

const initialState: IUserState = {
  currentUser: null,
  isFetching: false,
  loginError: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.isFetching = false;
      state.loginError = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.loginError = true;
    },
    logout: (state) => {
      state.currentUser = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
