import { Button } from "../components/button";
import { IterationPreview } from "../components/preview";

export function Overview({ iterations, onNew, onIterationClick, onIterationDelete }) {
	return (
		<>
			<h1 className="text3 center mb-2">
				Coding Challenge Condignum
				<small className="text2 block center">Markus Langthaler</small>
			</h1>
			<div className="center mb-2">
				<Button onClick={onNew} isPrimary>
					New Iteration
				</Button>
			</div>
			<ul>
				{iterations
					.sort(ascendingSort)
					.map((i, index) => {
						return (
							<li key={i.title}>
								<IterationPreview
									title={i.title}
									creationDateString={i.creationDateString}
									wasCompleted={i.wasCompleted}
									onClick={() => onIterationClick(index)}
									onDelete={() => onIterationDelete(index)}
								/>
							</li>
						)
					})
				}
			</ul>
		</>
	);
}

function ascendingSort(a, b) {
	return a.title.localeCompare(b.title)
}