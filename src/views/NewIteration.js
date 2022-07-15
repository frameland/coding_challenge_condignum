import { useState } from "react";
import { BackToOverview } from "../components/back";
import { Button } from "../components/button";
import { Input } from "../components/input";

export function NewIteration({ onComplete, onBack }) {
	const [userInput, setUserInput] = useState('');
	const [userInputError, setUserInputError] = useState('');

	function submit(e) {
		e.preventDefault();
		if (userInput === '') {
			setUserInputError('Please enter an iteration title!')
		} else {
			onComplete(userInput);
		}
	}

	return (
		<>
			<BackToOverview onBack={onBack} />
			<form onSubmit={submit}>
				<Input
					label='Enter Iteration title'
					name='title'
					error={userInputError}
					onChange={(e) => {
						setUserInput(e.target.value);
					}}
				/>
				<Button type="submit" className="block">
					Next
				</Button>
			</form>
		</>
	)
}
