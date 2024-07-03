import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { langText } from '../config/languages';
import { setLanguageAction } from '../redux/language-slice';
import { setSignOut } from '../redux/current-user-slice';

import style from '../styles/burger.module.scss';

export function BurgerMenu(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.language.value);
  const currentUser = useSelector((state) => state.currentUser.user);
  const langChoose = langText[lang];

  function toggleLang(event) {
    dispatch(setLanguageAction(event.target.value));
  }

  function handleClickLogOut() {
    dispatch(setSignOut());
    localStorage.removeItem('JWTtoken');
    handleClickOffBurgerMenu();
    navigate('/');
  }

  function handleClickOffBurgerMenu(event) {
    props.setBurgerMenu(false);
  }
  return (
    <div
      className={
        props.open
          ? [style.underMenu, style.underMenuActive].join(' ')
          : style.underMenu
      }
    >
      <div
        className={style.userNameWrapper}
        style={{ borderTop: '1px solid rgb(84, 99, 202)' }}
      >
        <Link
          className={style.linkHome}
          to="/"
          onClick={handleClickOffBurgerMenu}
        >
          {langChoose.header.homeLink}
        </Link>
        {currentUser && (
          <>
            <Link
              onClick={handleClickOffBurgerMenu}
              className={style.linkHome}
              to="user-posts"
            >
              {langChoose.header.myPosts}
            </Link>
            <Link
              className={style.linkHome}
              to="/posts/new"
              onClick={handleClickOffBurgerMenu}
            >
              {langChoose.header.createPostLink}
            </Link>
          </>
        )}
        <div className={style.langWrapper}>
          <label
            className={style.labelInputLang}
            style={{
              color: lang !== 'ru' && '#DADADA'
            }}
          >
            ru
            <input
              className={style.inputLang}
              onChange={toggleLang}
              value="ru"
              type="radio"
              name="langRadio"
              checked={lang === 'ru'}
            />
          </label>
          <label
            className={style.labelInputLang}
            style={{
              color: lang !== 'en' && '#DADADA'
            }}
          >
            en
            <input
              className={style.inputLang}
              value="en"
              onChange={toggleLang}
              type="radio"
              name="langRadio"
              checked={lang === 'en'}
            />
          </label>
        </div>
        {currentUser ? (
          <button
            style={{ cursor: 'pointer' }}
            className={[style.linkHome, style.signInLink].join(' ')}
            onClick={handleClickLogOut}
          >
            {langChoose.header.signOut}
          </button>
        ) : (
          <Link
            className={[style.linkHome, style.signInLink].join(' ')}
            onClick={handleClickOffBurgerMenu}
            to="/sign-in"
          >
            {langChoose.signIn.title}
          </Link>
        )}
      </div>
    </div>
  );
}
