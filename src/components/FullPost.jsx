import { useSelector } from 'react-redux';

import { Button } from './Button';

import { langText } from '../config/languages';

import Bookmark from '../assets/Bookmark.svg';
import Down from '../assets/Down.svg';
import Up from '../assets/Up.svg';

export function FullPost({ textPost, error, isLoading, image }) {
  const lang = useSelector((state) => state.language.value);

  const langChoose = langText[lang].fullPost;

  function renderPost() {
    if (error) {
      return <div className='text-danger'>Error: {error}</div>;
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <div
        className='d-flex flex-column gap-5 mt-5 border-bottom pb-5'
        style={{ maxWidth: '992px', margin: '0 auto' }}
      >
        <img src={image} alt='postImage' />
        <p>{textPost}</p>
        <div className='d-flex justify-content-between'>
          <div className='d-flex gap-4'>
            <Button background imagePath={Up} alt='like' />
            <Button background imagePath={Down} alt='dislike' />
          </div>
          <Button
            background
            imagePath={Bookmark}
            alt='bookmarks'
            text={langChoose.bookmarkText}
          />
        </div>
      </div>
    );
  }

  return renderPost();
}
