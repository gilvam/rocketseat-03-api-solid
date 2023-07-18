import {
	ICheckIn,
	ICheckInCreateInput,
	ICheckInsRepository,
} from '@/repositories/check-ins-repository.interface'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaUsersRepository implements ICheckInsRepository {
	async create(data: ICheckInCreateInput) {
		return prisma.checkIn.create({ data })
	}

	async saveUpdate(data: ICheckIn) {
		return prisma.checkIn.update({ where: { id: data.id }, data })
	}

	async findById(id: string) {
		return prisma.checkIn.findUnique({ where: { id } })
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startDay = dayjs(date).startOf('date')
		const endDay = dayjs(date).endOf('date')

		return prisma.checkIn.findFirst({
			where: {
				user_id: userId,
				create_at: { gte: startDay.toDate(), lte: endDay.toDate() },
			},
		})
	}

	async findManyByUserId(userId: string, page: number) {
		return prisma.checkIn.findMany({
			where: { user_id: userId },
			take: 20,
			skip: (page - 1) * 20,
		})
	}

	async countByUserId(id: string) {
		return prisma.checkIn.count({ where: { user_id: id } })
	}
}
