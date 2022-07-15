export function Layout({ children }) {
	const style = {
		maxWidth: "100%",
		width: 500,
		margin: "0 auto",
		padding: "2rem 0"
	};
	return (
		<main style={style}>
			{children && children}
		</main>
	)
}
