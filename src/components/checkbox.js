export function Checkbox({ children, onToggle, ...props }) {
	function onChange(e) {
		if (onToggle) {
			onToggle(e.target.checked);
		}
	}

	return (
		<label>
			<input type="checkbox" onChange={onChange} {...props} checked={props.checked || false} />
			<span>
				{children}
			</span>
		</label>
	);
}