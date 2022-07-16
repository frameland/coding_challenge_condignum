import { useState } from "react";
import { BackToOverview } from "../components/back";
import { useNavigate } from "react-router-dom";
import { routes } from "../common/routes";
import { Question } from "../components/question";
import { PageNav } from "../components/pagenav";

export function QuestionReadView({ title, questions, answers }) {
	const [step, setStep] = useState(0);
	let navigate = useNavigate();

	function next() {
		const newStep = step + 1;
		setStep(newStep);
		if (newStep >= questions.length) {
			navigate(routes.index);
		}
	}

	function previous() {
		const newStep = Math.max(step - 1, 0);
		setStep(newStep);
	}

	return (
		<>
			<BackToOverview />
			<Question
				questionObject={questions[step]}
				answers={answers[step]}
				element={(answer, index, isAnswerChecked) => (
					<div className="bg-neutral-100 inline-block px-3 py-1 mb-2 rounded">
						<span className="w-6 inline-block">{isAnswerChecked && '✔️'}</span>
						{answer}
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
