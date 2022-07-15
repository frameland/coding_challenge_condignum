import { Link } from "react-router-dom";
import { routes } from "../common/routes";

export function BackToOverview(props) {
	const style = {
		color: '#999',
		marginTop: '1rem',
		display: 'block',
		cursor: 'pointer',
		lineHeight: 3
	};
	return (
		<Link to={routes.index} style={style}>
			{'<-'} Back To Overview
		</Link>
	)
}
