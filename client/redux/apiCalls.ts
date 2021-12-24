import { Dispatch } from 'redux';
import { publicRequest } from '../shared/functions/requestMethods';
import { IUserLoginForm, IUserRegisterForm } from '../shared/interfaces';
import { loginFailure, loginStart, loginSuccess } from './userSlice';

export const login = async (dispatch: Dispatch, user: IUserLoginForm) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch: Dispatch, user: IUserRegisterForm) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/register', user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
