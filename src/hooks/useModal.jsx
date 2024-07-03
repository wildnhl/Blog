import ModalBootstrap from 'bootstrap/js/dist/modal';
import { useEffect, useState } from 'react';

export function useModal(ref, props) {
  const [modalInstance, setModalInstance] = useState(null);
  useEffect(() => {
    setModalInstance(ModalBootstrap.getOrCreateInstance(ref.current));
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener('hidden.bs.modal', props.onHidden);
  }, [ref]);

  useEffect(() => {
    if (!modalInstance) return;

    if (props.shown) {
      modalInstance.show();
    } else {
      modalInstance.hide();
    }
  }, [props.shown, modalInstance]);

  return {
    modalInstance
  };
}
