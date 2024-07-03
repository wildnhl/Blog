import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { ImagePostModal } from './components/ImagePostModal';

import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
        <ImagePostModal />
      </Main>
      <Footer />
    </>
  );
}
