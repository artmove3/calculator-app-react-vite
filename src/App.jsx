import { useState } from 'react';
import styles from './App.module.css';

function App() {
	const [result, setResult] = useState('0');
	const [separator, setSeparator] = useState(0);
	const [plusArray, setPlusArray] = useState([]);
	const [minusArray, setMinusArray] = useState([]);
	const [currentResult, setCurrentResult] = useState(0);
	const [isCalculated, setIsCaliculated] = useState(false);

	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	const isLastIsNumber =
		result[result.length - 1] != '+' && result[result.length - 1] != '-';

	const defineOperation = (num, operator) => {
		// если операция первая, заносит число в начальное, иначе заносит число в массив
		// слагаемых или вычитаемых соответственно знаку
		if (!separator) setCurrentResult(num);
		else if (operator === '+') setPlusArray([...plusArray, num]);
		else if (operator === '-') setMinusArray([...minusArray, num]);
	};
	const countResult = (lastOperand, operator) => {
		let lastCount = 0;
		if (operator === '+' || separator === 0) lastCount += lastOperand;
		if (operator === '-') lastCount -= lastOperand;
		// считает стартовое число + все слагаемые - все вычитаемые +/- последняя операция
		return (
			currentResult +
			plusArray.reduce((a, b) => a + b, 0) -
			minusArray.reduce((a, b) => a + b, 0) +
			lastCount
		);
	};

	const resetState = (num = 0) => {
		setSeparator(0);
		setPlusArray([]);
		setMinusArray([]);
		setCurrentResult(num);
		if (isCalculated) setIsCaliculated(false);
	};
	const numButtonHandler = (num) => {
		if (Number(result) === 0 && num != 0) setResult('');
		if (result === '0' && num === 0) setResult('0');
		else setResult((prev) => (prev += num));
		if (isCalculated) setIsCaliculated(false);
	};

	const plusHanlder = () => {
		if (isLastIsNumber) {
			setResult((prev) => (prev += '+'));
			defineOperation(
				Number(result.substring(separator, result.length)),
				result[separator - 1],
			);
			setSeparator(result.length + 1);
		}
		if (isCalculated) setIsCaliculated(false);
	};

	const minusHandler = () => {
		if (isLastIsNumber) {
			setResult((prev) => (prev += '-'));
			defineOperation(
				Number(result.substring(separator, result.length)),
				result[separator - 1],
			);
			setSeparator(result.length + 1);
		}
		if (isCalculated) setIsCaliculated(false);
	};

	const clearButtonHandler = () => {
		setResult('0');
		resetState();
	};

	const resultHandler = () => {
		if (separator) {
			let totalResult = countResult(
				Number(result.substring(separator, result.length)),
				result[separator - 1],
			);
			setResult(`${totalResult}`);
			resetState(totalResult);
			setIsCaliculated(true);
		}
	};
	return (
		<>
			<div className={styles.container}>
				<div className={styles.result}>
					<p className={isCalculated ? styles.complete : ''}>{result}</p>
				</div>
				<div className={styles.buttonsContainer}>
					<button onClick={clearButtonHandler}>C</button>
					{numbers.map((number) => {
						return (
							<button
								key={number}
								className={styles.numButton}
								onClick={() => numButtonHandler(number)}
							>
								{number}
							</button>
						);
					})}
					<button onClick={plusHanlder}>+</button>
					<button onClick={minusHandler}>-</button>
					<button onClick={resultHandler}>=</button>
				</div>
			</div>
		</>
	);
}

export default App;
