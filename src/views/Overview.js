import { isIterationComplete } from "../common/utils";
import { Button } from "../components/button";
import { IterationPreview } from "../components/preview";

export function Overview({ iterations, onNew, onIterationDelete }) {
	return (
		<>
			<h1 className="text-3xl text-center mb-6">
				<span className="underline font-bold">
					Coding Challenge Condignum
				</span>
				<small className="text-1xl block">
					Markus Langthaler
				</small>
			</h1>
			<div className="text-center mb-8">
				<Button
					isPrimary
					onClick={onNew}
				>
					New Iteration
				</Button>
			</div>
			<ul>
				{iterations
					.sort(stringSort)
					.map((i, index) => {
						const wasCompleted = isIterationComplete(i.answers);
						const path = wasCompleted ? 'read/' : 'iteration/';
						console.log(path, i.answers);
						return (
							<li key={i.creationDateString}>
								<IterationPreview
									title={i.title}
									creationDateString={i.creationDateString}
									wasCompleted={wasCompleted}
									path={path + index}
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