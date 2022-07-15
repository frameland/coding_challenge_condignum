import questions from "./questions.json";
import { useEffect, useState } from "react";
import { NewIteration } from "./views/NewIteration";
import { Overview } from "./views/Overview";
import { QuestionView } from "./views/QuestionView";
import { LocalStorage } from "./common/LocalStorage";

const routes = {
	'/': 1,
	'/new': 2,
	'/iteration/:id': 3,
	'/view/:id': 4
};

function App() {
	const [viewState, setViewState] = useState("overview");
	const [iterations, setIterations] = useState([]);
	const [activeIteration, setActiveIteration] = useState(-1);

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
		setActiveIteration(iterations.length);
		setViewState('iteration');
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
		setViewState('overview');
	}

	return (
		<Layout>
			{viewState === "overview" && (
				<Overview
					iterations={iterations}
					onNew={() => setViewState('new')}
					onIterationClick={(index) => {
						setActiveIteration(index);
						setViewState('iteration');
					}}
					onIterationDelete={(index) => removeIteration(index)}
				/>
			)}
			{viewState === "new" && (
				<NewIteration
					onComplete={addIteration}
					onBack={onBack}
				/>
			)}
			{
				viewState === "iteration" && activeIteration >= 0 && (
					<QuestionView
						questions={questions}
						title={iterations[activeIteration].title}
						initialAnswers={iterations[activeIteration].answers}
						onDone={(answers) => finishIteration(answers)}
						onBack={onBack}
					/>)
			}
		</Layout>
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

export function nrOfQuestionsAnswered(answers) {
	const answeredQuestions = answers.filter(a => {
		return a.filter(Boolean).length > 0;
	});
	return answeredQuestions.length;
}

export function isIterationComplete(answers) {
	return nrOfQuestionsAnswered(answers) === answers.length;
}

export default App;
