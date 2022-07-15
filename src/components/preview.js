import { Button } from "./button";
import { Link } from "react-router-dom";

export function IterationPreview({ title, creationDateString, wasCompleted, path, onDelete }) {
	const style = {
		background: wasCompleted ? '#A3DAA1' : '#eeeeee',
		padding: '2em',
		textDecoration: 'none',
		color: 'inherit'
	};

	const date = new Date(creationDateString);
	return (
		<>
			<Link to={path} style={style} className="block">
				<h2 className="text2">{title}</h2>
				<p>Date: {date.toLocaleDateString() + ", " + date.toLocaleTimeString()}</p>
				<span>Completed: {wasCompleted ? "yes" : "no"}</span>
			</Link>
			<Button className="block mt-1 mb-1" onClick={onDelete}>
				Delete
			</Button>
		</>
	)
}