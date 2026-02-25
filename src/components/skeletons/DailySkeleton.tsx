import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

const DAILY_ROW_COUNT = 7

export default function DailySkeleton() {
	return (
		<Card
			title="Daily Forecast"
			childrenClassName="flex flex-col gap-4"
		>
			{Array.from({ length: DAILY_ROW_COUNT }).map((_, index) => (
				<div key={index} className="flex justify-between items-center">
					<Skeleton className="h-5 w-9" />
					<Skeleton className="size-8 rounded-full" />
					<Skeleton className="h-5 w-14" />
					<Skeleton className="h-5 w-14" />
					<Skeleton className="h-5 w-14" />
				</div>
			))}
		</Card>
	)
}
