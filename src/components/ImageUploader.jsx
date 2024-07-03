import { useState } from 'react';

export function ImageUploader({ id, register, className, setValue, trigger }) {
  const [imageUrl, setImageUrl] = useState('');

  function handleChange(event) {
    const file = event.target.files[0];
    if (file === undefined) {
      setImageUrl('');
      return;
    }
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  function handleClickDeleteImage() {
    setImageUrl('');
    setValue('image', '');
    trigger('image');
  }

  function renderPreview() {
    if (!imageUrl) return null;

    return (
      <div className="d-flex flex-column">
        <p
          className="text-danger"
          onClick={handleClickDeleteImage}
          style={{ cursor: 'pointer' }}
        >
          Удалить картинку
        </p>
        <img
          src={imageUrl}
          alt="preview"
          className="rounded w-50 d-inline-block mt-3"
        />
      </div>
    );
  }

  return (
    <>
      <label htmlFor={id} className="form-label">
        Image
      </label>
      <input
        type="file"
        id={id}
        className={className}
        {...register('image', {
          required: true,
          onChange: (event) => handleChange(event)
        })}
      />
      {renderPreview()}
    </>
  );
}
