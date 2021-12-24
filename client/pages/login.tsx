import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import { login } from '../redux/apiCalls';
import { IReduxState } from '../shared/interfaces';

const LoginPage = () => {
  // states
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const { currentUser, isFetching, loginError } = useSelector(
    (state: IReduxState) => state.user
  );

  // redirect if there is a user also fixing useState exshautive deps
  const usePush = (): NextRouter['push'] => {
    const router = useRouter();
    const routerRef = useRef(router);

    routerRef.current = router;

    const [{ push }] = useState<Pick<NextRouter, 'push'>>({
      push: (path) => routerRef.current.push(path)
    });
    return push;
  };

  const push = usePush();

  useEffect(() => {
    if (currentUser) {
      push('/');
    }
  }, [currentUser, push]);

  // functions
  const handleLogin = async () => {
    await login(dispatch, { username, password });
  };

  return (
    <div className="loginPage-container">
      <div className="loginPage-wrapper">
        <h1>SIGN IN</h1>
        <form>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={handleLogin} disabled={isFetching}>
            LOGIN
          </button>
          {loginError && (
            <span className="loginPage-error">Something went wrong...</span>
          )}
          <a>DON&#96;T REMEMBER THE PASSWORD?</a>
          <Link href="/register" passHref>
            <a>CREATE A NEW ACCOUNT</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
