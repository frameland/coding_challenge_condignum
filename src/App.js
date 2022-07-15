import questions from "./questions.json";
import { useEffect, useState } from "react";
import { NewIteration } from "./views/NewIteration";
import { Overview } from "./views/Overview";
import { QuestionView } from "./views/QuestionView";
import { LocalStorage } from "./common/LocalStorage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { routes } from "./common/routes";
import { isIterationComplete } from "./common/utils";

function App() {
	const [initialized, setInitialized] = useState(false);
	const [iterations, setIterations] = useState([]);
	const [activeIteration, setActiveIteration] = useState(-1);
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
		setActiveIteration(index);
		navigate(routes.iteration.replace(':id', index));
	}

	function finishIteration(answers) {
		let updated = [...iterations];
		updated[activeIteration] = {
			title: updated[activeIteration].title,
			creationDateString: updated[activeIteration].creationDateString,
			answers: answers,
			wasCompleted: isIterationComplete(answers)
		};
		setIterations(updated);
		onBack();
	}

	function removeIteration(index) {
		let updated = [...iterations];
		updated.splice(index, 1);
		setIterations(updated);
		if (updated.length === 0) {
			saveState(updated);
		}
	}

	function onBack() {
		setActiveIteration(-1);
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
						onIterationClick={(index) => setActiveIteration(index)}
						onIterationDelete={(index) => removeIteration(index)}
					/>
				} />
				<Route path={routes.new} element={
					<NewIteration
						onComplete={addIteration}
						onBack={onBack}
					/>
				} />
				<Route path={routes.iteration} element={
					<QuestionViewHelper
						questions={questions}
						iteration={iterations[activeIteration]}
						onDone={(answers) => finishIteration(answers)}
						onBack={onBack}
					/>
				} />
			</Routes>
		</Layout>
	);
}

function QuestionViewHelper({ questions, iteration, onDone, onBack }) {
	if (!iteration) return null;

	return (
		<QuestionView
			questions={questions}
			title={iteration.title}
			initialAnswers={iteration.answers}
			onDone={onDone}
			onBack={onBack}
		/>
	);
}

function Layout({ children }) {
	const style = {
		maxWidth: "100%",
		width: 500,
		margin: "0 auto",
		padding: "2rem 0"
	};
	return (
		<main style={style}>
			{children && children}
		</main>
	)
}

export default App;
