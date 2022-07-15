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
				<Button
					isPrimary
					onClick={onNew}>
					New Iteration
				</Button>
			</div>
			<ul>
				{iterations
					.sort(stringSort)
					.map((i, index) => {
						return (
							<li key={i.creationDateString}>
								<IterationPreview
									title={i.title}
									creationDateString={i.creationDateString}
									wasCompleted={i.wasCompleted}
									path={'iteration/' + index}
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

function stringSort(a, b) {
	return a.title.localeCompare(b.title)
}