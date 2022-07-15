export function Button({ onClick, isPrimary, disabled, type, ...props }) {
	let style = {
		borderRadius: 0,
		outline: 0,
		border: 0,
		opacity: disabled ? 0.5 : 1.0,
		color: 'black',
		background: '#eee',
		letterSpacing: '0.2rem',
		cursor: disabled ? '' : 'pointer',
		minWidth: 200,
		lineHeight: 3
	};
	if (isPrimary) {
		style.background = '#88e';
	}
	return (
		<button onClick={onClick} type={type} style={style} {...props} />
	);
}
