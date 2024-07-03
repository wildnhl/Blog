import style from '../styles/burger.module.scss';

import BurgerImg from '../assets/burger-icon.svg';
import CloseBurgerImg from '../assets/close-burger.svg';

export function Burger(props) {
  return (
    <div className={style.a} onClick={props.burgerClick}>
      <img src={props.openMenu ? CloseBurgerImg : BurgerImg} alt="burger" />
    </div>
  );
}
