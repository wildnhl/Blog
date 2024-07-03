import { Title } from '../components/Title';
import { NewPostForm } from '../components/NewPostForm';

export function NewPost() {
  return (
    <>
      <Title titleName="Add post" />
      <NewPostForm />
    </>
  );
}
