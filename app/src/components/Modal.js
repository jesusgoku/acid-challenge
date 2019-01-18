import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';


function Modal({ open, title, onClose, children }) {
  return (<div className={`Modal ${open ? 'Modal-open' : ''}`}>
    <div className="Modal__box">
      <div className="Modal__header">
        {title && <h3 className="Modal__title">{ title }</h3>}
      </div>

      <div className="Modal__body">{ children }</div>

      <div className="Modal__footer"></div>

      {onClose && <button className="Modal__close" onClick={onClose}>X</button>}
    </div>
  </div>);
}

Modal.defaultProps = {
  open: false,
};

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Modal;
