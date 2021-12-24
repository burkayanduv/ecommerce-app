import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { IReduxState } from '../shared/interfaces';
import { logout } from '../redux/userSlice';

const Navbar = () => {
  const quantity = useSelector((state: IReduxState) => state.cart.quantity);
  const { currentUser } = useSelector((state: IReduxState) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <div className="navbar-language">EN</div>
          <div className="navbar-searchContainer">
            <input />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </div>
        </div>
        <div className="navbar-center">
          <Link href="/" passHref>
            <div className="navbar-logo">E-STORE</div>
          </Link>
        </div>
        <div className="navbar-right">
          {currentUser ? (
            <div className="navbar-menuItem" onClick={() => dispatch(logout())}>
              LOGOUT
            </div>
          ) : (
            <>
              <Link href="/register" passHref>
                <div className="navbar-menuItem">REGISTER</div>
              </Link>
              <Link href="/login" passHref>
                <div className="navbar-menuItem">SIGN IN</div>
              </Link>
            </>
          )}
          <div className="navbar-menuItem">
            <Link href="/cart" passHref>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined color="action" />
              </Badge>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
