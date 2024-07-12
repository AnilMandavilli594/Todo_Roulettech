// Button.js

import PropTypes from 'prop-types';

const Button = ({ onClick, label, className }) => {
    return (
        <button
            onClick={onClick}
            className={`btn ${className}`}
        >
            {label}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Button;
