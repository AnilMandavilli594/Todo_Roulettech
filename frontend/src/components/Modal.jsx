import PropTypes from 'prop-types';

const Modal = ({ id, title, value, handleChange, handleClick }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered w-full mt-8"
          />
          <div className="modal-action">
            <label htmlFor={id} onClick={handleClick} className="btn btn-primary">
              Edit
            </label>
            <label htmlFor={id} className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Modal;
