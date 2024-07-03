import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { fetchCreateUserThunk } from '../redux/auth-slice';

import { langText } from '../config/languages';

export function SignUp() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [isReg, setIsReg] = useState(false);

  const lang = useSelector((state) => state.language.value);
  const langChoose = langText[lang].signUp;

  function handleChangeInput(event) {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  }

  function returnErrors({ name, email, password, confirm }) {
    const errors = {};
    if (name === '') {
      errors.name = 'Поле не должно быть пустым';
    }

    if (email === '') {
      errors.email = 'Поле не должно быть пустым';
    } else if (!email.includes('@')) {
      errors.email = 'Должен присутствовать символ @';
    }

    if (password.length < 8) {
      errors.password = 'должно быть минимум 8 знаков';
    }
    if (confirm !== password) {
      errors.confirm = 'пароли не совпадают';
    }
    return errors;
  }

  function showEmailAndPass(event) {
    event.preventDefault();
    const obj = returnErrors(formFields);
    setErrors(obj);

    if (Object.keys(obj).length === 0) {
      setIsReg(true);
      dispatch(
        fetchCreateUserThunk({
          username: formFields.name,
          email: formFields.email,
          password: formFields.password,
          course_group: 5
        })
      );
    }
  }

  function renderForm() {
    if (!isReg || currentUser.email !== formFields.email) {
      return (
        <form className="border p-4 rounded-4">
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              {langChoose.form.email}
            </label>
            {errors.email && <p className="text-danger">{errors.email}</p>}
            <input
              name="email"
              type="email"
              className="form-control"
              id="emailInput"
              value={formFields.email}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label position-relative">
              {langChoose.form.name}
            </label>
            {errors.name && <p className="text-danger">{errors.name}</p>}
            <input
              type="text"
              name="name"
              className="form-control"
              id="nameInput"
              value={formFields.name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              {langChoose.form.password}
            </label>
            {errors.password && (
              <p className="text-danger">{errors.password}</p>
            )}
            <input
              type="password"
              name="password"
              className="form-control"
              id="passwordInput"
              value={formFields.password}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassInput" className="form-label">
              {langChoose.form.confirm}
            </label>
            {errors.confirm && <p className="text-danger">{errors.confirm}</p>}
            <input
              type="password"
              name="confirm"
              className="form-control"
              id="confirmPassInput"
              value={formFields.confirm}
              onChange={handleChangeInput}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={showEmailAndPass}
          >
            {langChoose.form.btnText}
          </button>
          <p>
            {langChoose.form.haveAccount}{' '}
            <Link to="/sign-in">{langChoose.form.toLogin}</Link>
          </p>
        </form>
      );
    } else {
      return <Navigate to="/reg-confirm" />;
    }
  }

  return renderForm();
}
