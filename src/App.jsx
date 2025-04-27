import React, { useState } from 'react';
import styles from './App.module.css';

const initial = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', 'C', '0', '<x'];

export const App = () => {
	const [result, setResult] = useState('');

	return (
		<div className={styles.container}>
			<div className={styles.output}>{result}</div>
			<div className={styles.buttonsContainer}>
				{initial.map((button, index) => (
					<div
						key={index}
						className={`${styles.button}
						 ${['+', '-'].includes(button) ? styles.operationButton : ''}
						 ${['C', '<x'].includes(button) ? styles.specialButton : styles.numberButton}
						  ${button === '=' ? styles.equalButton : ''}`}
					>
						{button}
					</div>
				))}
			</div>
		</div>
	);
};
