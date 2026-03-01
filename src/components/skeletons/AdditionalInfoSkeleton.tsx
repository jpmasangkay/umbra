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
			childrenClassName="flex flex-col gap-0"
		>
			{Array.from({ length: INFO_ROW_COUNT }).map((_, index) => (
				<div key={index} className={`flex justify-between items-center py-3.5 ${index !== INFO_ROW_COUNT - 1 ? 'border-b border-border/40' : ''}`}>
					<div className="flex items-center gap-3">
						<Skeleton className="size-9 rounded-lg" />
						<Skeleton className="h-4 w-28" />
					</div>
					<Skeleton className="h-4 w-20" />
				</div>
			))}
		</Card>
	)
}
