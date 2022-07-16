export function Input({ label, name, error, onChange, ...props }) {
	let classes = 'border-2 rounded p-1 border-indigo-600';

	function handleChange(e) {
		if (onChange) {
			onChange(e)
		}
	}

	return (
		<div className="mb-4">
			<label htmlFor={name} className="block text-xs font-bold">
				{label}
			</label>
			<input id={name} {...props} className={classes} onChange={handleChange} />
			{error && (
				<div className="text-red-500 text-xs">
					{error}
				</div>
			)}
		</div>
	);
}
