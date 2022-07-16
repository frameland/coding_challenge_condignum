import { Button } from "./button";
import { Link } from "react-router-dom";

export function IterationPreview({ title, creationDateString, wasCompleted, path, onDelete }) {
	let classes = 'block p-4 border relative ';
	if (wasCompleted) {
		classes += 'bg-green-100 ';
	} else {
		classes += 'bg-zinc-100 ';
	}

	const date = new Date(creationDateString);
	return (
		<div className={classes}>
			<Link to={path}>
				<h2 className="text-2xl">
					<span className="mr-2">
						{wasCompleted && '✅'}
						{!wasCompleted && '✏️'}
					</span>
					{title}
				</h2>
				{wasCompleted && (
					<p>
						All questions were answered.
					</p>
				)}
				{!wasCompleted && (
					<p>
						Click to complete the iteration.
					</p>
				)}
				<p className="text-zinc-500 mt-4">
					Date: {date.toLocaleDateString() + ", " + date.toLocaleTimeString()}
				</p>
			</Link>
			<div className="bottom-0 right-0 absolute p-2 z-1">
				<Button onClick={onDelete}>
					Remove
				</Button>
			</div>
		</div>
	)
}