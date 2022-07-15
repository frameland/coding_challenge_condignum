import { Button } from "./button";

export function IterationPreview({ title, creationDateString, wasCompleted, onClick, onDelete }) {
	const style = {
		background: wasCompleted ? '#A3DAA1' : '#eeeeee',
		padding: '2em',
		textDecoration: 'none',
		color: 'inherit'
	};

	const date = new Date(creationDateString);
	return (
		<>
			<a href="#" style={style} className="block" onClick={onClick}>
				<h2 className="text2">{title}</h2>
				<p>Date: {date.toLocaleDateString() + ", " + date.toLocaleTimeString()}</p>
				<span>Completed: {wasCompleted ? "yes" : "no"}</span>
			</a>
			<Button className="block mt-1 mb-1" onClick={onDelete}>
				Delete
			</Button>
		</>
	)
}