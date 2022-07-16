import questions from "./questions.json";
import { useEffect, useState } from "react";
import { LocalStorage } from "./common/LocalStorage";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { routes } from "./common/routes";
import { isIterationComplete } from "./common/utils";
import { NewIteration } from "./views/NewIteration";
import { Overview } from "./views/Overview";
import { QuestionView } from "./views/QuestionView";
import { QuestionReadView } from "./views/QuestionReadView";
import { Layout } from "./components/layout";

function App() {
	const [initialized, setInitialized] = useState(false);
	const [iterations, setIterations] = useState([]);
	let navigate = useNavigate();

	useEffect(() => {
		loadState();
	}, []);

	// save iterations whenever they change
	useEffect(() => {
		if (iterations.length > 0) {
			saveState(iterations);
		}
	}, [iterations]);

	function loadState() {
		const savedIterations = LocalStorage.get('iterations');
		if (savedIterations) {
			setIterations(JSON.parse(savedIterations));
		}
		setInitialized(true);
	}

	function saveState(iterations) {
		const str = JSON.stringify(iterations);
		LocalStorage.set('iterations', str);
	}

	function addIteration(title) {
		setIterations([...iterations, {
			title,
			creationDateString: new Date().toISOString()
		}]);
		const index = iterations.length;
		navigate(routes.iteration.replace(':id', index));
	}

	function finishIteration(answers, index) {
		let updated = [...iterations];
		updated[index] = {
			title: updated[index].title,
			creationDateString: updated[index].creationDateString,
			answers: answers
		};
		setIterations(updated);
	}

	function removeIteration(index) {
		let updated = [...iterations];
		updated.splice(index, 1);
		setIterations(updated);
		if (updated.length === 0) {
			saveState(updated); // special case, because we don't normally save if empty array
		}
	}

	if (!initialized) {
		return <p>Loading...</p>
	}

	return (
		<Layout>
			<Routes>
				<Route path={routes.index} element={
					<Overview
						iterations={iterations}
						onNew={() => navigate(routes.new)}
						onIterationDelete={(index) => removeIteration(index)}
					/>
				} />
				<Route path={routes.new} element={
					<NewIteration
						onComplete={addIteration}
					/>
				} />
				<Route path={routes.iteration} element={
					<QuestionViewHelper
						questions={questions}
						iterations={iterations}
						onDone={finishIteration}
					/>
				} />
				<Route path={routes.read} element={
					<QuestionReadViewHelper
						questions={questions}
						iterations={iterations}
					/>
				} />
			</Routes>
		</Layout>
	);
}

function QuestionViewHelper({ questions, iterations, onDone }) {
	const iteration = useIteration(iterations);
	if (!iteration) return null;

	return (
		<QuestionView
			questions={questions}
			title={iteration.title}
			initialAnswers={iteration.answers}
			onDone={onDone}
		/>
	);
}

function QuestionReadViewHelper({ questions, iterations }) {
	const iteration = useIteration(iterations);
	if (!iteration) return null;

	return (
		<QuestionReadView
			questions={questions}
			title={iteration.title}
			answers={iteration.answers}
		/>
	);
}

function useIteration(iterations) {
	const { id } = useParams();
	if (!iterations) return null;
	let result = Number.isNaN(parseInt(id)) ? 0 : id;
	result = Math.min(result, iterations.length - 1)
	return iterations[result];
}

export default App;
