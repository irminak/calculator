import React, { useEffect, useState } from 'react';
import Button from './Button';
import { data } from '../data';

import '../Style/Keyboard.css';

const Keyboard = ({
    firstNumber,
    setFirstNumber,
    secondNumber,
    setSecondNumber,
}) => {
    const [initiation, setInitiation] = useState(false);
    const [action, setAction] = useState(false);
    const [operator, setOperator] = useState([]);
    const [operatorArray, setOperatorArray] = useState([]);
    const [resultNumber, setResultNumber] = useState(null);

    const handleClick = (clickedButton) => {
        if (clickedButton && clickedButton.action === 'number') {
            pickingNumbers(clickedButton);
        } else if (clickedButton && clickedButton.action === 'triplenumber') {
            pickingZeros(clickedButton);
        } else if (clickedButton && clickedButton.action === 'dot') {
            addingDots(clickedButton);
        } else if (clickedButton && clickedButton.action === 'changeTheSign') {
            changingSign();
        } else if (clickedButton && clickedButton.action === 'divideBy100') {
            toPercentages();
        } else if (clickedButton && clickedButton.approving) {
            changingState(clickedButton);
        } else if (clickedButton && clickedButton.action === 'delete') {
            cleaning();
        }
    };
    const handleChildKeyDown = (event) => {
        const { key } = event;
        if (!isNaN(key)) {
            handleClick({ id: key, action: 'number' });
        } else if (key === '.') {
            handleClick({ id: key, action: 'dot' });
        } else if (key === 'Backspace') {
            handleClick({ action: 'delete' });
        } else if (key === '/') {
            handleClick({ approving: true, action: 'divide' });
        } else if (key === '*') {
            handleClick({ approving: true, action: 'multiplication' });
        } else if (key === '-') {
            handleClick({ approving: true, action: 'subtraction' });
        } else if (key === '+') {
            handleClick({ approving: true, action: 'addition' });
        } else if (key === '=' || key === 'Enter') {
            handleClick({ approving: true, action: 'equal' });
        }
    };

    const pickingNumbers = (clickedButton) => {
        if (!initiation) {
            if (firstNumber.length > 9) return;
            else {
                if (firstNumber[0] === '0' && firstNumber[1] !== '.') {
                    firstNumber.shift();
                    setFirstNumber((prevNumber) => [
                        ...prevNumber,
                        clickedButton.id,
                    ]);
                } else {
                    setFirstNumber((prevNumber) => [
                        ...prevNumber,
                        clickedButton.id,
                    ]);
                }
            }
        } else if (initiation && !action) {
            if (secondNumber.length > 9) return;
            else {
                setSecondNumber((prevNumber) => [
                    ...prevNumber,
                    clickedButton.id,
                ]);
            }
        }
    };

    const pickingZeros = (clickedButton) => {
        if (!initiation) {
            if (firstNumber.length > 9) return;
            else {
                setFirstNumber((prevNumber) => [
                    ...prevNumber,
                    ...clickedButton.id,
                ]);
            }
        } else if (initiation && !action) {
            if (secondNumber.length > 9) return;
            else {
                setSecondNumber((prevNumber) => [
                    ...prevNumber,
                    ...clickedButton.id,
                ]);
            }
        }
    };

    const addingDots = (clickedButton) => {
        if (!initiation) {
            if (!firstNumber.includes(clickedButton.id)) {
                setFirstNumber((prevNumber) => [
                    ...prevNumber,
                    clickedButton.id,
                ]);
            } else return;
        } else if (initiation && !action) {
            if (!secondNumber.includes(clickedButton.id)) {
                setSecondNumber((prevNumber) => [
                    ...prevNumber,
                    clickedButton.id,
                ]);
            }
        }
    };

    const changingState = (clickedButton) => {
        setOperatorArray((prevOperator) => [
            ...prevOperator,
            clickedButton.action,
        ]);
        setOperator(operatorArray[operatorArray.length - 1]);
        if (!initiation) {
            setInitiation(true);
            const firstNumberValue = firstNumber.join('');
            setFirstNumber([firstNumberValue]);
        } else {
            setAction(true);
            const secondNumberValue = secondNumber.join('');
            setSecondNumber([secondNumberValue]);
        }
    };

    useEffect(() => {
        combine(Number(firstNumber), Number(secondNumber), operator);
        setAction(false);
    }, [action]);

    const combine = (firstNumber, secondNumber, operator) => {
        if (operator === 'addition') {
            setResultNumber(firstNumber + secondNumber);
        } else if (operator === 'divide') {
            if (secondNumber !== 0) {
                setResultNumber(firstNumber / secondNumber);
            } else {
                setFirstNumber(NaN);
            }
        } else if (operator === 'multiplication') {
            setResultNumber(firstNumber * secondNumber);
        } else if (operator === 'subtraction') {
            setResultNumber(firstNumber - secondNumber);
        } else if (operator === 'equal') {
            setResultNumber(firstNumber);
        }
        resetFunction(resultNumber);
    };

    const resetFunction = (resultNumber) => {
        if (resultNumber) {
            setFirstNumber(resultNumber);
        }
        setSecondNumber([]);
    };

    const cleaning = () => {
        setFirstNumber(['0']);
        setSecondNumber([]);
        setResultNumber(null);
        setOperatorArray([]);
        setInitiation(false);
        setAction(false);
    };
    const changingSign = () => {
        if (!initiation) {
            if (firstNumber[0] === '0') return;

            const firstNumberValue = -1 * Number(firstNumber.join(''));
            setFirstNumber([firstNumberValue]);
            setInitiation(true);
        } else {
            if (secondNumber.length === 0) {
                setFirstNumber(firstNumber * -1);
            } else {
                const secondNumberValue = -1 * Number(secondNumber.join(''));
                setSecondNumber([secondNumberValue]);
            }
        }
    };
    const toPercentages = () => {
        if (!initiation) {
            if (firstNumber[0] === '0') return;
            const firstNumberValue = Number(firstNumber.join('')) / 100;
            setFirstNumber([firstNumberValue]);
        } else {
            if (secondNumber.length === 0) {
                setFirstNumber(firstNumber / 100);
            } else {
                const secondNumberValue = Number(secondNumber.join('')) / 100;
                setSecondNumber([secondNumberValue]);
            }
        }
    };

    return (
        <div className='keyboard'>
            {data.map((button) => {
                return (
                    <Button
                        onClick={() => handleClick(button)}
                        onChildKeyDown={handleChildKeyDown}
                        tabIndex='0'
                        key={button.id}
                        id={button.id}
                        className={button.action}
                    />
                );
            })}
        </div>
    );
};

export default Keyboard;
