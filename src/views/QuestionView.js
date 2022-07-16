import { useEffect, useState } from "react";
import { routes } from "../common/routes";
import { BackToOverview } from "../components/back";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import { isIterationComplete, nrOfQuestionsAnswered } from "../common/utils";
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
				title={title}
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
			<Question
				questionObject={questions[step]}
				answers={answers[step]}
				element={(answer, index, isAnswerChecked) => (
					<div className="bg-indigo-50 inline-block px-3 py-1 mb-2 rounded">
						<Checkbox
							name={answer}
							onToggle={(checked) => toggleAnswer(checked, index)}
							checked={isAnswerChecked}
						>
							<span className="ml-1">{answer}</span>
						</Checkbox>
					</div>
				)}
			/>
			<PageNav
				pageIndex={step}
				nrOfPages={questions.length}
				onPrevious={previous}
				onNext={next}
			/>
			<p className="text-xs text-zinc-400 mt-6 text-center">
				Iteration: {title}
			</p>
		</>
	);
}

function Confirmation({ onConfirm, title, answers }) {
	const wasCompleted = isIterationComplete(answers);
	return (
		<>
			<h1 className="text-2xl font-bold">Good job!</h1>
			{wasCompleted &&
				<p>You have completed this iteration!</p>
			}
			{!wasCompleted &&
				<p>
					You have answered {nrOfQuestionsAnswered(answers)} out of {answers.length} questions.
					You can still edit your answers by selecting this iteration (<span className="font-bold">{title}</span>) from the overview.
				</p>
			}
			<Button isPrimary onClick={onConfirm} className="mt-4">
				{wasCompleted && <span>Done</span>}
				{!wasCompleted && <span>Got it</span>}

			</Button>
		</>
	)
}
