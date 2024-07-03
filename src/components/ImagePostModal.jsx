import { useDispatch, useSelector } from 'react-redux';
import { setModalHidden } from '../redux/modal-slice';

import { Modal } from './Modal';

export function ImagePostModal() {
  const dispatch = useDispatch();
  const shownModal = useSelector((state) => state.modal.isActive);
  const image = useSelector((state) => state.modal.url);

  function onHidden() {
    dispatch(setModalHidden());
  }

  return (
    <Modal shown={shownModal} onHidden={onHidden}>
      <img src={image} alt='post' />
    </Modal>
  );
}
