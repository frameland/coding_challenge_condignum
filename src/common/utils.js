export function nrOfQuestionsAnswered(answers) {
	if (!answers) return 0;
	const answeredQuestions = answers.filter(a => {
		return a.filter(Boolean).length > 0;
	});
	return answeredQuestions.length;
}

export function isIterationComplete(answers) {
	if (!answers) return false;
	return nrOfQuestionsAnswered(answers) === answers.length;
}
