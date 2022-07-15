import { useEffect, useState } from "react";
import { routes } from "../common/routes";
import { BackToOverview } from "../components/back";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { useNavigate } from "react-router-dom";
import { isIterationComplete } from "../common/utils";

export function QuestionView({ questions, initialAnswers, title, onDone, onBack }) {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState(initialAnswers);
	let navigate = useNavigate();

	useEffect(() => {
		// create a 2D array for holding the state of the answers
		// unless our questions were only partially answered => start with saved answers
		if (!answers) {
			let emptyAnswers = new Array(questions.length);
			for (let index = 0; index < questions.length; index++) {
				const nrOfAnswers = questions[index].answers.length;
				emptyAnswers[index] = new Array(nrOfAnswers).fill(false);
			}
			setAnswers(emptyAnswers);
		}
	}, []);

	function next() {
		setStep(step + 1);
	}

	function previous() {
		const newStep = Math.max(step - 1, 0);
		setStep(newStep);
	}

	function toggleAnswer(checked, index) {
		let newAnswers = [...answers];
		newAnswers[step][index] = checked;
		setAnswers(newAnswers);
	}

	if (step >= questions.length) {
		return (
			<Confirmation
				answers={answers}
				onConfirm={() => {
					onDone(answers);
					navigate(routes.index);
				}}
			/>
		)
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
					Next
				</Button>
			</nav>
			<span className="block mt-1 center" >
				{step + 1} / {questions.length}
			</span>
		</>
	);
}

function Confirmation({ onConfirm, answers }) {
	const wasCompleted = isIterationComplete(answers);
	return (
		<>
			<h2 className="text2">Good job!</h2>
			{wasCompleted &&
				<p>You have completed this iteration!</p>
			}
			{!wasCompleted &&
				<p>You can still edit your answers from the overview.</p>
			}
			<Button isPrimary onClick={onConfirm}>
				Done
			</Button>
		</>
	)
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
