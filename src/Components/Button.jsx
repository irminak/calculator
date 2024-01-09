import React from 'react';

import '../Style/Button.css';

const Button = (props) => {
    const { className, onClick, onChildKeyDown, id } = props;
    const operatorStyle =
        className === 'delete'
            ? 'delete-style'
            : className === 'number' ||
              className === 'dot' ||
              className === 'triplenumber'
            ? ''
            : 'operator-style';

    const handleKeyDown = (event) => {
        onChildKeyDown(event);
    };

    return (
        <div className='button'>
            <h2
                className={`${className} ${operatorStyle}`}
                onClick={onClick}
                tabIndex='0'
                onKeyDown={handleKeyDown}
            >
                {id}
            </h2>
        </div>
    );
};

export default Button;
