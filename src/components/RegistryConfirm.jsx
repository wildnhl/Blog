import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { fetchActivateUserThunk } from '../redux/auth-slice';

import { langText } from '../config/languages';

export function RegistryConfirm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.value);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const activateAuth = useSelector((state) => state.auth.isActivate);

  const langChoose = langText[lang].registryConfirm;

  function handleActivate() {
    const obj = {
      uid: 'Nzk5NA',
      token: 'c2ci3u-40a0ccd33688a29bf2cff1f0599e24f8'
    };
    dispatch(fetchActivateUserThunk(obj));
  }

  useEffect(() => {
    if (activateAuth) {
      navigate('/auth/activate/NzkyNw/c1zmd1-236b54cfb4e42cac7c9348063120ee24');
    }
  }, [activateAuth, navigate]);

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>
          {langChoose.form.confirmText}
          <i onClick={handleActivate}>{currentUser.email}</i>
        </h5>
        <p className='card-text'>{langChoose.form.reminder}</p>
        <Link to='/' className='btn btn-primary mt-2'>
          {langChoose.form.btnText}
        </Link>
      </div>
    </div>
  );
}
