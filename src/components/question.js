// element is a render prop of the form:
// (answer, index, isAnswerChecked) => ()
export function Question({ questionObject, answers, element }) {
	return (
		<>
			<h2>{questionObject.question}</h2>
			<ul className="mb-2">
				{questionObject.answers.map((answer, index) => {
					return (
						<li key={answer}>
							{element(answer, index, answers && answers[index])}
						</li>
					)
				})}
			</ul>
		</>
	)
}
