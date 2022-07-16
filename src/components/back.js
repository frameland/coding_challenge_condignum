import { Link } from "react-router-dom";
import { routes } from "../common/routes";

export function BackToOverview(props) {
	let classes = 'border rounded outline-0 px-4 py-2 cursor-pointer ';
	classes += 'text-zinc-600 bg-zinc-100 hover:bg-zinc-200';
	return (
		<div className="my-4">
			<Link to={routes.index} className={classes}>
				← Go back
			</Link>
		</div>
	)
}
