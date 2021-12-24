export interface IProduct {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
  createdAt: string;
}

export interface ICartPayload extends IProduct {
  quantity: number;
}

export interface ICartState {
  products: Array<ICartPayload>;
  quantity: number;
  total: number;
}

export interface IUserLoginForm {
  username: string;
  password: string;
}

export interface IUserRegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  img: string;
  createdAt: string;
}

export interface IUserState {
  currentUser: IUser | null;
  isFetching: boolean;
  loginError: boolean;
}

export interface IReduxState {
  cart: ICartState;
  user: IUserState;
}
