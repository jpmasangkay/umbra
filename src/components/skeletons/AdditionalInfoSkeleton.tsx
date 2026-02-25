import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

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
