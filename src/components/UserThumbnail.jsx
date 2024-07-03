import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCurrentUser } from '../redux/current-user-slice';

import userIcon from '../assets/user-icon.svg';

import cl from '../styles/userThumbnail.module.scss';

export function UserThumbnail() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.auth.jwToken);
  const storeUser = useSelector((state) => state.currentUser.user);
  const storeUserName =
    useSelector((state) => state.currentUser.user?.username) ?? '';
  const isCurrentUser = storeUser !== null;

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [jwt, dispatch]);

  return (
    <Link to={isCurrentUser ? '#' : '/sign-in'} className={cl.userNameWrapper}>
      {!isCurrentUser ? (
        <img src={userIcon} className={cl.userName} alt="userlogo" />
      ) : (
        <>
          <div className={cl.userNameLogo}>{storeUserName[0]}</div>
          <p className={cl.userName}>{storeUserName}</p>
        </>
      )}
    </Link>
  );
}
