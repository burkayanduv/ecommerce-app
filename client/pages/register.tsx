import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { register } from '../redux/apiCalls';
import { IReduxState } from '../shared/interfaces';

const RegisterPage = () => {
  // states
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
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

  const handleRegister = async () => {
    await register(dispatch, { username, email, password });
  };

  return (
    <div className="registerPage-container">
      <div className="registerPage-wrapper">
        <h1>CREATE AN ACCOUNT</h1>
        <form>
          <input type="text" placeholder="name" />
          <input type="text" placeholder="last name" />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="password" placeholder="confirm password" />
          <span>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button type="button" onClick={handleRegister} disabled={isFetching}>
            CREATE
          </button>
          {loginError && (
            <span className="loginPage-error">Something went wrong...</span>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
