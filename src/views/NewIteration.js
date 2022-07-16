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
			<BackToOverview />
			<h1 className="text-2xl font-bold">
				New Iteration
			</h1>
			<form onSubmit={submit} className="my-2">
				<Input
					label='Iteration title'
					name='title'
					error={userInputError}
					onChange={(e) => {
						setUserInput(e.target.value);
					}}
				/>
				<Button type="submit" className="block" isPrimary>
					Create Iteration
				</Button>
			</form>
		</>
	)
}
