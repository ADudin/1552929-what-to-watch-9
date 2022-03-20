import LogoComponent from '../../components/logo-component/logo-component';

import {
  useRef,
  FormEvent
} from 'react';

import {
  ToastContainer,
  toast
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks/hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/auth-data';
import {AppRoute} from '../../const';

function SignInComponent(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const MIN_PASSWORD_LENGTH = 2;
  const RE_FOR_NUMBER_VALUE = /[0-9]/;
  const RE_FOR_LETTER_VALUE = /[a-z]/;

  const isPasswordValid = (password: string) => {
    if (
      password.split('').length < MIN_PASSWORD_LENGTH ||
      password.split('').find((item) => item === ' ') ||
      !password.split('').find((item) => RE_FOR_NUMBER_VALUE.test(item)) ||
      !password.split('').find((item) => RE_FOR_LETTER_VALUE.test(item.toLowerCase()))
    ) {
      toast('We can\'t recognize this email and password combination. Please try again.');
      return false;
    }

    return true;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(
      loginRef.current !== null &&
      passwordRef.current !== null &&
      isPasswordValid(passwordRef.current.value)
    ) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
      navigate(AppRoute.Main);
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <LogoComponent />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <ToastContainer />
      <div className="sign-in user-page__content">
        <form
          action=""
          className="sign-in__form"
          onSubmit = {handleSubmit}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                ref = {loginRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                ref = {passwordRef}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <LogoComponent />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInComponent;
