// element is a render prop of the form:
// (answer, index, isAnswerChecked) => ()
export function Question({ questionObject, answers, element }) {
	return (
		<>
			<h2 className="text-xl mt-2 leading-loose">{questionObject.question}</h2>
			<ul className="mb-4">
				{questionObject.answers.map((answer, index) => {
					return (
						<li key={answer} className="ml-4">
							{element(answer, index, answers && answers[index])}
						</li>
					)
				})}
			</ul>
		</>
	)
}
