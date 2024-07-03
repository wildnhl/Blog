import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setModalAction, setModalActive } from '../redux/modal-slice';
import {
  setBookmarkAction,
  setDislikesAction,
  setLikesAction
} from '../redux/posts-slice';

import bookmarkFavorite from '../assets/Bookmark-favorite.svg';
import bookmark from '../assets/Bookmark.svg';
import dislikeImg from '../assets/Down.svg';
import likeImg from '../assets/Up.svg';

import cl from '../styles/postAside.module.scss';

export function PostAside(props) {
  const dispatch = useDispatch();

  const handleClickLike = () => {
    dispatch(setLikesAction(props.id));
  };

  const handleClickDislike = () => {
    dispatch(setDislikesAction(props.id));
  };

  const handleClickBookmark = () => {
    dispatch(setBookmarkAction(props.id));
  };

  const setModalOpen = () => {
    dispatch(setModalAction(props.image));
    dispatch(setModalActive());
  };
  return (
    <>
      <div className='d-flex flex-column  border-bottom border-secondary'>
        <div className='d-flex justify-content-between gap-4'>
          <Link className={cl.decorLink} to={`/post/${props.id}`}>
            <div className={cl.color}>
              <p className={cl.dateStyle}>{props.date}</p>
              <h5 className={cl.title}>{props.title}</h5>
            </div>
          </Link>
          <img
            className={cl.imgStyle}
            onClick={setModalOpen}
            src={props.image}
            alt='space'
          />
        </div>
        <div className='d-flex align-items-center justify-content-between mt-auto mb-4'>
          <div className='d-flex align-items-center'>
            <button className='btn p-0' onClick={handleClickLike} alt='like'>
              <img src={likeImg} alt='like' />
            </button>
            <p className={cl.likeCouter}>{props.likes}</p>
            <button
              className='btn p-0'
              onClick={handleClickDislike}
              alt='dislike'
            >
              <img src={dislikeImg} alt='dislike' />
            </button>
          </div>
          <div className='d-flex align-items-center'>
            <div className='d-flex align-items-center'>
              <button
                className='btn p-0'
                onClick={handleClickBookmark}
                alt='like'
              >
                <img
                  src={props.isFavorite ? bookmarkFavorite : bookmark}
                  alt='bookmark'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
