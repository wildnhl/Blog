import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAuthUserThunk } from '../redux/auth-slice';

import { langText } from '../config/languages';

export function SignIn() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.value);
  const langChoose = langText[lang].signIn;

  function handleChangeEmail(event) {
    setEmailValue(event.target.value);
  }

  function handleChangePassword(event) {
    setPasswordValue(event.target.value);
  }

  function showEmailAndPass(event) {
    event.preventDefault();
    const postUserObject = { email: emailValue, password: passwordValue };
    dispatch(fetchAuthUserThunk(postUserObject));
    console.log(postUserObject);
  }
  return (
    <form className='border p-4 rounded-4'>
      <div className='mb-3'>
        <label htmlFor='exampleInputEmail1' className='form-label'>
          {langChoose.form.email}
        </label>
        <input
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          value={emailValue}
          onChange={handleChangeEmail}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='exampleInputPassword1' className='form-label'>
          {langChoose.form.password}
        </label>
        <input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          value={passwordValue}
          onChange={handleChangePassword}
        />
      </div>
      <button
        onClick={showEmailAndPass}
        type='submit'
        className='btn btn-primary'
      >
        {langChoose.form.btnText}
      </button>
      <p>
        {langChoose.form.haveAccount}{' '}
        <Link to='/sign-up'>{langChoose.form.toReg}</Link>
      </p>
    </form>
  );
}
