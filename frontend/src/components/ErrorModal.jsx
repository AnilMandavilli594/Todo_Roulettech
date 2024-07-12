import PropTypes from 'prop-types';

const Modal = ({ id, title, value, handleClick }) => {
  return (
    <div id={id} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg text-black font-bold mb-2">{title}</h2>
        <p className="mb-4 text-black">{value}</p>
        <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Modal;
