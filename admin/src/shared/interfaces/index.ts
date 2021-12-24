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

export interface IProductState {
  products: IProduct[];
  isFetching: boolean;
  error: boolean;
}

export interface IAddProductForm {
  title?: string;
  desc?: string;
  img?: string;
  categories?: string[];
  size?: string[];
  color?: string[];
  price?: number;
  inStock?: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  img: string;
  createdAt: string;
  accessToken: string;
}

export interface IUserState {
  currentUser: IUser | null;
  isFetching: boolean;
  loginError: boolean;
}

export interface IUserLoginForm {
  username: string;
  password: string;
}

export interface IReduxState {
  product: IProductState;
  user: IUserState;
}

export interface IDummyUser {
  id: number;
  username: string;
  avatar: string;
  email: string;
  status: string;
  transaction: string;
}

export interface IOrder {
  address: string;
  amount: number;
  createdAt: string;
  products: IProduct[];
  status: string;
  updatedAt: string;
  userId: string;
  __v: number;
  _id: string;
}

export interface IIncome {
  _id: number;
  total: number;
}
