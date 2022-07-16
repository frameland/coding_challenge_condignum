export function Layout({ children }) {
	let classes = 'container mx-auto mt-6 py-4 px-2';
	return (
		<main className={classes} style={{ width: 500 }}>
			{children && children}
		</main>
	)
}
