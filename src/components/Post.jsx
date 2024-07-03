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

import cl from '../styles/post.module.scss';

export function Post(props) {
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
      <div
        className='d-flex flex-column border-bottom border-secondary'
        style={
          props.firstPost ? { gridColumn: '1/-1' } : { gridColumn: 'auto' }
        }
      >
        {props.firstPost ? (
          <div className='d-flex gap-4'>
            <Link style={{ textDecoration: 'none' }} to={`/post/${props.id}`}>
              <div style={{ color: '#313037' }}>
                <p className={cl.dateStyle}>{props.date}</p>
                <h3
                  className={cl.lineLimitTopTitle}
                  style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '24px'
                  }}
                >
                  {props.title}
                </h3>
                {props.firstPost && (
                  <p className={cl.lineLimit} style={{ color: '#8D8E97' }}>
                    {props.text}
                  </p>
                )}
              </div>
            </Link>
            <img
              className={cl.mainPostImage}
              onClick={setModalOpen}
              src={props.image}
              alt='space'
            />
          </div>
        ) : (
          <div className='d-flex flex-column'>
            <img
              className={cl.postImage}
              onClick={setModalOpen}
              src={props.image}
              alt='space'
            />
            <Link
              style={{ textDecoration: 'none', color: '#313037' }}
              to={`/post/${props.id}`}
            >
              <p className={cl.dateStyle}>{props.date}</p>
              <h3 className={cl.title}>{props.title}</h3>
              {props.firstPost && <p>{props.text}</p>}
            </Link>
          </div>
        )}

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
