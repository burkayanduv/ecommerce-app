import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { IReduxState } from './shared/interfaces';
import Home from './pages/Home';
import UserList from './pages/UserList';
import User from './pages/User';
import NewUser from './pages/NewUser';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';
import './styles/globals.scss';

function App() {
  const admin = useSelector(
    (state: IReduxState) => state.user.currentUser?.isAdmin
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            admin ? (
              <>
                <Topbar />
                <div className="container">
                  <Sidebar />
                  <Home />
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <UserList />
              </div>
            </>
          }
        />
        <Route
          path="/user/:userId"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <User />
              </div>
            </>
          }
        />
        <Route
          path="/newUser"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewUser />
              </div>
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <ProductList />
              </div>
            </>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <Product />
              </div>
            </>
          }
        />
        <Route
          path="/newproduct"
          element={
            <>
              <Topbar />
              <div className="container">
                <Sidebar />
                <NewProduct />
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
