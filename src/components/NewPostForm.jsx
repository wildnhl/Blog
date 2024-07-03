import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchCreatePostThunk,
  setClearCreatedPost
} from '../redux/posts-slice';
import { ImageUploader } from './ImageUploader';
import { useEffect } from 'react';

export function NewPostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createdPost = useSelector((state) => state.posts.createdPost);

  const {
    register,
    handleSubmit,
    resetField,
    setValue,
    trigger,
    formState: { errors }
  } = useForm();
  console.log(errors);
  const onSubmit = (data) => {
    const formData = new FormData();

    for (const field in data) {
      if (data[field] instanceof FileList) {
        formData.append(field, data[field][0]);
      } else {
        formData.append(field, data[field]);
      }
    }

    dispatch(fetchCreatePostThunk(formData));
  };

  useEffect(() => {
    if (createdPost !== null) {
      navigate(`/post/${createdPost.id}`);
      dispatch(setClearCreatedPost());
    }
  }, [dispatch, navigate, createdPost]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="titleFormInput" className="form-label">
          Title
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="titleFormInput"
          {...register('title', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lessonNumFormInput" className="form-label">
          Lesson number
        </label>
        <input
          type="number"
          className={`form-control ${errors.lesson_num ? 'is-invalid' : ''}`}
          id="lessonNumFormInput"
          {...register('lesson_num', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionFormInput" className="form-label">
          Description
        </label>
        <input
          type="text"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          id="descriptionFormInput"
          {...register('description', { required: true })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="textFormInput" className="form-label">
          Text
        </label>
        <textarea
          type="text"
          className={`form-control ${errors.text ? 'is-invalid' : ''}`}
          id="textFormInput"
          {...register('text', { required: true })}
        />
      </div>
      <div className="mb-3">
        <ImageUploader
          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
          type="file"
          id="fileFormInput"
          register={register}
          resetField={resetField}
          setValue={setValue}
          trigger={trigger}
        />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-warning">Cancel</button>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={Object.keys(errors).length}
        >
          Add post
        </button>
      </div>
    </form>
  );
}
