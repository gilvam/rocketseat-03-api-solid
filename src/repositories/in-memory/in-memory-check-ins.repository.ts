import {
	ICheckIn,
	ICheckInCreateInput,
	ICheckInsRepository,
} from '@/repositories/interfaces/check-ins-repository.interface'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
	list: ICheckIn[] = []

	async create(data: ICheckInCreateInput): Promise<ICheckIn> {
		const checkIn: ICheckIn = {
			id: randomUUID(),
			user_id: data.user_id,
			gym_id: data.gym_id,
			create_at: new Date(),
			validated_at: data.validated_at
				? new Date(data.validated_at)
				: new Date(),
		}

		this.list.push(checkIn)

		return checkIn
	}

	async saveUpdate(checkIn: ICheckIn): Promise<ICheckIn> {
		const checkInIndex = this.list.findIndex((it) => (it.id = checkIn.id))

		if (checkInIndex >= 0) {
			this.list[checkInIndex] = checkIn
		}

		return checkIn
	}

	async findById(id: string): Promise<ICheckIn | null> {
		return this.list.find((it) => it.id === id) || null
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<ICheckIn | null> {
		const startDay = dayjs(date).startOf('date')
		const endDay = dayjs(date).endOf('date')

		const checkInOnSameDate = this.list.find((checkIn) => {
			const checkInDate = dayjs(checkIn.create_at)
			const isOnSameDate =
				checkInDate.isAfter(startDay) && checkInDate.isBefore(endDay)

			return checkIn.user_id === userId && isOnSameDate
		})

		if (!checkInOnSameDate) {
			return null
		}

		return checkInOnSameDate
	}

	async findManyByUserId(userId: string, page: number): Promise<ICheckIn[]> {
		return (
			this.list
				.filter((it) => it.user_id === userId)
				.slice((page - 1) * 20, page * 20) || []
		)
	}

	async countByUserId(userId: string): Promise<number> {
		return this.list.filter((it) => it.user_id === userId).length
	}
}
