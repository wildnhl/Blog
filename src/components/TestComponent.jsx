import { useEffect, useState } from 'react';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://studapi.teachmeskills.by',
  timeout: 1000
});
export function TestComponent() {
  const [post, setPost] = useState(null);
  const [value, setValue] = useState('');
  function handleClick(event) {
    setValue(event.target.value);
  }
  useEffect(() => {
    fetchPost(12);
  }, [post]);

  async function fetchPost(id) {
    const response = await client.get(`/blog/posts/${id}/`);
    setPost(response.data);
  }
  return (
    <>
      <h1 style={{ color: 'red' }}>Hello</h1>;
      <input
        aria-label="input"
        onChange={handleClick}
        value={value}
        type="text"
      />
      {post && (
        <div>
          <h2>{post.title}</h2>
        </div>
      )}
    </>
  );
}
