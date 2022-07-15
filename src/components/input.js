export function Input({ label, name, error, onChange, ...props }) {
	const style = {
		borderRadius: 0,
		outline: 0,
		border: '1px solid'
	};

	function handleChange(e) {
		if (onChange) {
			onChange(e)
		}
	}

	return (
		<div className="mb-1">
			<label htmlFor={name} className="block text-bold">{label}</label>
			<input id={name} style={style} {...props} onChange={handleChange} />
			{error && <div style={{ color: 'red' }}>{error}</div>}
		</div>
	);
}
