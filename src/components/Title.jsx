import { useSelector } from 'react-redux';

import { langText } from '../config/languages';

import style from '../styles/title.module.scss';

export function Title(props) {
  const lang = useSelector((state) => state.language.value);
  const langChoose = langText[lang];
  const titleText =
    props.titleName in langChoose
      ? langChoose[props.titleName].title
      : props.titleName;

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{titleText}</h2>
    </div>
  );
}
