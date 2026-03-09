/**
 * HourlySkeleton – loading placeholder for the HourlyForecast card.
 * Renders 24 placeholder items in a horizontal scroll container.
 */
import Card from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'

/** Number of placeholder hourly items to render */
const HOURLY_ITEM_COUNT = 24

export default function HourlySkeleton() {
	return (
		<Card
			title="Hourly Forecast"
			childrenClassName="flex gap-8 overflow-x-auto pb-4"
		>
			{Array.from({ length: HOURLY_ITEM_COUNT }).map((_, index) => (
				<div
					key={index}
					className="flex flex-col gap-2 items-center shrink-0 w-20 py-3 px-2 rounded-xl bg-accent/50"
				>
					<Skeleton className="h-4 w-14" />
					<Skeleton className="size-8 rounded-full" />
					<Skeleton className="h-4 w-12" />
				</div>
			))}
		</Card>
	)
}
