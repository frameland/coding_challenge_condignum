export function Button({ onClick, isPrimary, disabled, className, type, ...props }) {
	let classes = 'border-0 rounded outline-0 px-4 py-2 cursor-pointer ';
	classes += 'disabled:opacity-50 ';
	if (isPrimary) {
		classes += 'text-indigo-50 bg-indigo-600 hover:bg-indigo-500 ';
	} else {
		classes += 'text-slate-50 bg-slate-600 hover:bg-slate-500 ';
	}
	if (className) {
		classes += className + ' ';
	}

	return (
		<button onClick={onClick} type={type} disabled={disabled} className={classes} {...props} />
	);
}
