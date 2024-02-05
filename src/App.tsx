import { useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {

	const [counter, setCounter] = useState<number>(0);

	const addCounter = () => {
		setCounter(i => i + 1);
	};

	return (
		<>
			<Button onClick={addCounter}>{counter}</Button>
			<Input />			
		</>
	);
}

export default App;
