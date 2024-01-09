import React from 'react';

import '../Style/Display.css';

const Display = ({
    firstNumber,
    setFirstNumber,
    secondNumber,
    setSecondNumber,
}) => {
    const calculateFontSize = (num) => {
        const baseFontSize = 60;
        const fontSizeStep = 1;
        let fontSize;

        const lengthArr = num.length;
        const length = num.toString().length;

        if (Array.isArray(firstNumber)) {
            if (lengthArr <= 10) return;
            else {
                fontSize = baseFontSize - fontSizeStep * (lengthArr - 1);
            }
        } else {
            if (length <= 10) return;
            else {
                fontSize = baseFontSize - fontSizeStep * (length + 9);
            }
        }

        return `${fontSize}px`;
    };
    return (
        <div
            className='display'
            style={{ fontSize: calculateFontSize(firstNumber) }}
        >
            {secondNumber.length === 0 ? firstNumber : secondNumber}
        </div>
    );
};

export default Display;
