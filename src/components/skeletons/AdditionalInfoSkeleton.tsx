/**
 * AdditionalInfoSkeleton – loading placeholder for the AdditionalInfo card.
 * Renders 6 rows with icon + label placeholders to match the real layout.
 */
import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

/** Number of info rows (cloudiness, UV, wind dir, pressure, sunrise, sunset) */
const INFO_ROW_COUNT = 6

export default function AdditionalInfoSkeleton() {
	return (
		<Card
			title="Additional Info"
			childrenClassName="flex flex-col gap-8"
		>
			{Array.from({ length: INFO_ROW_COUNT }).map((_, index) => (
				<div key={index} className="flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Skeleton className="size-8 rounded-full" />
						<Skeleton className="h-5 w-28" />
					</div>
					<Skeleton className="h-6 w-20" />
				</div>
			))}
		</Card>
	)
}
