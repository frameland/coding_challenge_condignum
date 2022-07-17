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
			<IterationList
				iterations={iterations}
				onDelete={onIterationDelete}
			/>
		</>
	);
}

function IterationList({ iterations, onDelete }) {
	if (iterations.length === 0) {
		return <EmptyState />;
	}

	return (
		<ul>
			{iterations
				.sort(stringSort)
				.map((i, index) => {
					const wasCompleted = isIterationComplete(i.answers);
					const path = wasCompleted ? 'read/' : 'iteration/';
					return (
						<li key={i.creationDateString}>
							<IterationPreview
								title={i.title}
								creationDateString={i.creationDateString}
								wasCompleted={wasCompleted}
								path={path + index}
								onDelete={() => onDelete(index)}
							/>
						</li>
					)
				})
			}
		</ul>
	);
}

function EmptyState(props) {
	let classes = 'p-4 border bg-neutral-100 text-neutral-700 text-center h-1/2 border-2';

	return (
		<div className={classes}>
			<h2 className="text-2xl font-bold mt-4">Welcome!</h2>
			<p className="w-64 mx-auto mb-4">
				Start a new iteration by clicking the <span className="font-bold">New Iteration</span> button.
			</p>
		</div>
	);
}

function stringSort(a, b) {
	return a.title.localeCompare(b.title)
}