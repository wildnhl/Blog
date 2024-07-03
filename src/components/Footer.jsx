import { useSelector } from 'react-redux';
import { langText } from '../config/languages';
import style from '../styles/footer.module.scss';
export function Footer() {
  const lang = useSelector((state) => state.language.value);
  const langChoose = langText[lang].footer;

  return (
    <footer>
      <div className='container'>
        <div className={[style.content, style.dFlex].join(' ')}>
          <p className={style.text}>©2024 Blogfolio</p>
          <p className={style.text}>{langChoose.rightsText}</p>
        </div>
      </div>
    </footer>
  );
}
