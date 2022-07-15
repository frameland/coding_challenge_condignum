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
			<h1 className="text3">{title}</h1>
			<Question
				questionObject={questions[step]}
				answers={answers[step]}
				element={(answer, index, isAnswerChecked) => (
					<span>
						{answer} {isAnswerChecked ? 'yes' : 'no'}
					</span>
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
