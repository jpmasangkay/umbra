/**
 * DailySkeleton – loading placeholder for the DailyForecast card.
 * Renders 7 rows matching the daily forecast layout.
 */
import Card from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'

/** Number of placeholder daily rows (one per day) */
const DAILY_ROW_COUNT = 7

export default function DailySkeleton() {
	return (
		<Card
			title="Daily Forecast"
			childrenClassName="flex flex-col gap-0"
		>
			{Array.from({ length: DAILY_ROW_COUNT }).map((_, index) => (
				<div key={index} className={`flex justify-between items-center py-3 ${index !== DAILY_ROW_COUNT - 1 ? 'border-b border-border/40' : ''}`}>
					<Skeleton className="h-4 w-10" />
					<Skeleton className="size-8 rounded-full" />
					<Skeleton className="h-4 w-14" />
					<Skeleton className="h-4 w-28" />
				</div>
			))}
		</Card>
	)
}
