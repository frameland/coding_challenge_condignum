export function nrOfQuestionsAnswered(answers) {
	const answeredQuestions = answers.filter(a => {
		return a.filter(Boolean).length > 0;
	});
	return answeredQuestions.length;
}

export function isIterationComplete(answers) {
	return nrOfQuestionsAnswered(answers) === answers.length;
}
