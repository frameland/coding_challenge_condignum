import { Button } from "./button";

export function PageNav({ pageIndex, nrOfPages, onPrevious, onNext }) {
	return (
		<>
			<nav>
				<Button className="mr-1" onClick={onPrevious} disabled={pageIndex === 0}>
					Previous
				</Button>
				<Button isPrimary={true} onClick={onNext}>
					Next
				</Button>
			</nav>
			<span className="block mt-1 center" >
				{pageIndex + 1} / {nrOfPages}
			</span>
		</>
	)
}