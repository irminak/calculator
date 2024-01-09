import React, { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

import '../Style/Calculator.css';

const Calculator = () => {
    const [firstNumber, setFirstNumber] = useState(['0']);
    const [secondNumber, setSecondNumber] = useState([]);

    return (
        <div className='calculator'>
            <Display
                firstNumber={firstNumber}
                setFirstNumber={setFirstNumber}
                secondNumber={secondNumber}
                setSecondNumber={setSecondNumber}
            />
            <Keyboard
                firstNumber={firstNumber}
                setFirstNumber={setFirstNumber}
                secondNumber={secondNumber}
                setSecondNumber={setSecondNumber}
            />
        </div>
    );
};

export default Calculator;
