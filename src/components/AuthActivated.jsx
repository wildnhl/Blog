import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { langText } from '../config/languages';

export function AuthActivated() {
  const lang = useSelector((state) => state.language.value);
  const langChoose = langText[lang].authActivated;

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{langChoose.form.confirmText}</h5>
        <p className='card-text'>{langChoose.form.completeText}</p>
        <Link to='/' className='btn btn-primary mt-2'>
          {langChoose.form.btnText}
        </Link>
      </div>
    </div>
  );
}
