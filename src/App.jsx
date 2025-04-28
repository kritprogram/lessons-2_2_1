import React, { useState } from 'react';
import styles from './App.module.css';

const NUMS = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', 'C', '0', '<x'];

export const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [result, setResult] = useState('');

	const handleButtonClick = (button) => {
		if (button === 'C') {
			resetState();
			return;
		}

		if (button === '<x') {
			backspace();
			return;
		}

		if (['+', '-'].includes(button)) {
			handleOperator(button);
			return;
		}

		if (button === '=') {
			calculateResult();
			return;
		}

		handleNumberInput(button);
	};

	const resetState = () => {
		setOperand1('');
		setOperator('');
		setOperand2('');
		setResult('');
	};

	const backspace = () => {
		if (operand2) {
			setOperand2((prev) => prev.slice(0, -1));
		} else if (operator) {
			setOperator('');
		} else if (operand1) {
			setOperand1((prev) => prev.slice(0, -1));
		}
	};

	const handleOperator = (newOperator) => {
		if (operand1 && operator && operand2) {
			const calculatedResult =
				operator === '+'
					? Number(operand1) + Number(operand2)
					: operator === '-'
						? Number(operand1) - Number(operand2)
						: 0;

			setOperand1(calculatedResult.toString());
			setOperator(newOperator);
			setOperand2('');
			setResult('');
		} else if (result) {
			setOperand1(result.toString());
			setOperator(newOperator);
			setOperand2('');
			setResult('');
		} else {
			setOperator(newOperator);
		}
	};

	const calculateResult = () => {
		if (operand1 && operator && operand2) {
			const calculatedResult =
				operator === '+'
					? Number(operand1) + Number(operand2)
					: operator === '-'
						? Number(operand1) - Number(operand2)
						: 0;

			setOperand1(calculatedResult.toString());
			setOperator('');
			setOperand2('');
			setResult(calculatedResult);
		}
	};

	const handleNumberInput = (number) => {
		if (result) {
			setOperand1(number);
			setOperator('');
			setOperand2('');
			setResult('');
		} else if (!operator) {
			setOperand1((prev) => prev + number);
		} else {
			setOperand2((prev) => prev + number);
		}
	};

	return (
		<div className={styles.container}>
			<div className={`${styles.output} ${result ? styles.resultColor : ''}`}>
				{result || `${operand1} ${operator} ${operand2}`}
			</div>
			<div className={styles.buttonsContainer}>
				{NUMS.map((button, index) => (
					<div
						key={index}
						className={`${styles.button} ${['+', '-'].includes(button) ? styles.operationButton : ''}
						 ${['C', '<x'].includes(button) ? styles.specialButton : styles.numberButton}
						  ${button === '=' ? styles.equalButton : ''}`}
						onClick={() => handleButtonClick(button)}
					>
						{button}
					</div>
				))}
			</div>
		</div>
	);
};
