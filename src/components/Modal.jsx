import { useRef } from 'react';

import { useModal } from '../hooks/useModal';

export function Modal(props) {
  const modalRef = useRef(null);
  useModal(modalRef, props);

  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
