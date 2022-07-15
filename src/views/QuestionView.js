import { useEffect, useState } from "react";
import { routes } from "../common/routes";
import { BackToOverview } from "../components/back";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { isIterationComplete } from "../common/utils";
import { Question } from "../components/question";
import { PageNav } from "../components/pagenav";

export function QuestionView({ questions, initialAnswers, title, onDone }) {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState(initialAnswers);
	const { id } = useParams();
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

	if (!answers) return null;

	if (step >= questions.length) {
		return (
			<Confirmation
				answers={answers}
				onConfirm={() => {
					onDone(answers, id);
					navigate(routes.index);
				}}
			/>
		)
	}

	return (
		<>
			<BackToOverview />
			<h1 className="text3">{title}</h1>
			<Question
				questionObject={questions[step]}
				answers={answers[step]}
				element={(answer, index, isAnswerChecked) => (
					<Checkbox
						name={answer}
						onToggle={(checked) => toggleAnswer(checked, index)}
						checked={isAnswerChecked}
					>
						{answer}
					</Checkbox>
				)}
			/>
			<PageNav
				pageIndex={step}
				nrOfPages={questions.length}
				onPrevious={previous}
				onNext={next}
			/>
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
