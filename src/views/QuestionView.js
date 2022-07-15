import { useEffect, useState } from "react";
import { BackToOverview } from "../components/back";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";

export function QuestionView({ questions, initialAnswers, title, onDone, onBack }) {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState(initialAnswers);

	useEffect(() => {
		// create a 2D array for holding the state of the answers
		if (!answers) {
			let initialAnswers = new Array(questions.length);
			for (let index = 0; index < questions.length; index++) {
				const nrOfAnswers = questions[index].answers.length;
				initialAnswers[index] = new Array(nrOfAnswers).fill(false);
			}
			setAnswers(initialAnswers);
		}
	}, []);

	function next() {
		const newStep = Math.min(step + 1, questions.length);
		if (newStep < questions.length) {
			setStep(newStep);
		} else {
			goBack();
		}
	}

	function previous() {
		const newStep = Math.max(step - 1, 0);
		setStep(newStep);
	}

	function goBack() {
		onDone(answers);
	}

	function toggleAnswer(checked, index) {
		let newAnswers = [...answers];
		newAnswers[step][index] = checked;
		setAnswers(newAnswers);
	}

	return (
		<>
			<BackToOverview onBack={onBack} />
			<h1 className="text3">{title}</h1>
			<Question
				question={questions[step]}
				state={answers ? answers[step] : null}
				toggleAnswer={toggleAnswer}
			/>
			<nav>
				<Button className="mr-1" onClick={previous} disabled={step === 0}>
					Previous
				</Button>
				<Button isPrimary={true} onClick={next}>
					{step === questions.length - 1 && 'Finish'}
					{step < questions.length - 1 && 'Next'}
				</Button>
			</nav>
		</>
	);
}



function Question({ question, state, toggleAnswer }) {
	return (
		<>
			<h2>{question.question}</h2>
			<ul className="mb-2">
				{question.answers.map((answer, index) => {
					return (
						<li key={answer}>
							<Checkbox
								name={answer}
								onToggle={(checked) => toggleAnswer(checked, index)}
								checked={state && state[index]}
							>
								{answer}
							</Checkbox>
						</li>
					)
				})}
			</ul>
		</>
	)
}
