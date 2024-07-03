import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Burger } from './Burger';
import { BurgerMenu } from './BurgerMenu';
import { UserThumbnail } from './UserThumbnail';

import SearchImg from '../assets/search.svg';

import style from '../styles/header.module.scss';

export function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  function toggleMenu() {
    setIsOpenMenu(!isOpenMenu);
  }
  function handleSubmitForm(event) {
    event.preventDefault();
    navigate(`/posts/search/${searchInput}`);
    console.log(searchInput);
  }
  function handleChangeSearch(event) {
    setSearchInput(event.target.value);
  }

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Burger burgerClick={toggleMenu} openMenu={isOpenMenu} />
        <form
          onSubmit={handleSubmitForm}
          style={{ width: '100%', display: 'flex', gap: '1px' }}
        >
          <input
            onChange={handleChangeSearch}
            className={style.input}
            type='text'
            placeholder='Search...'
            value={searchInput}
          />
          <button
            type='sumbit'
            {...{ disabled: !searchInput }}
            className={style.a}
          >
            <img src={SearchImg} alt='search' />
          </button>
        </form>
        <UserThumbnail />
      </div>
      <BurgerMenu open={isOpenMenu} setBurgerMenu={setIsOpenMenu} />
    </header>
  );
}
