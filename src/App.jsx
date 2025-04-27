import React, { useState } from 'react';
import styles from './App.module.css';

function App() {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);
	const [list, setList] = useState([]);

	function validate(val) {
		if (val.length < 3) return 'Введенное значение должно содержать минимум 3 символа';
	}

	function addNewValue() {
		const promptValue = prompt('Введите значение').trim();
		const error = validate(promptValue);
		if (error) {
			setError(error);
			return;
		}
		setValue(promptValue);
		setError(null);
	}

	function addToList() {
		setList((prev) => [...prev, { id: Date.now(), text: value }]);
		setValue('');
		setError(null);
	}

	return (
		<>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error ? <div className={styles.error}>{error}</div> : null}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={addNewValue}>
					Ввести новое
				</button>
				<button className={styles.button} onClick={addToList} disabled={!value}>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length === 0 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map((li) => (
							<li key={li.id} className={styles['list-item']}>
								{li.text}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}

export default App;
