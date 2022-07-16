import { Button } from "./button";

export function PageNav({ pageIndex, nrOfPages, onPrevious, onNext }) {
	return (
		<>
			<nav className="flex mt-4 mb-4">
				<Button className="mx-1 flex-1" onClick={onPrevious} disabled={pageIndex === 0}>
					← Previous
				</Button>
				<Button className="mx-1 flex-1" isPrimary={true} onClick={onNext}>
					Next →
				</Button>
			</nav>
			<span className="block text-center text-xs text-zinc-600" >
				{pageIndex + 1} / {nrOfPages}
			</span>
		</>
	)
}