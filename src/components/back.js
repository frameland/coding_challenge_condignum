export function BackToOverview({ onBack }) {
	const style = {
		color: '#999',
		marginTop: '1rem',
		display: 'block',
		cursor: 'pointer',
		lineHeight: 3
	};
	return (
		<a onClick={onBack} style={style}>
			{'<-'} Back To Overview
		</a>
	)
}
