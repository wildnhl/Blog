import style from '../styles/main.module.scss';

export function Main(props) {
  return (
    <main className={[style.mainContent, 'container'].join(' ')}>
      {props.children}
    </main>
  );
}
