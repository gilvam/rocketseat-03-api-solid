import { prisma } from '@/lib/prisma'
import {
	ICheckIn,
	ICheckInCreateInput,
	ICheckInsRepository,
} from '@/repositories/interfaces/check-ins-repository.interface'

export class CheckInsRepository implements ICheckInsRepository {
	async create(data: ICheckInCreateInput): Promise<ICheckIn> {
		return prisma.checkIn.create({ data })
	}

	async saveUpdate(checkIn: ICheckIn): Promise<ICheckIn> {
		return {} as any
	}

	async findById(id: string): Promise<ICheckIn | null> {
		return null
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<ICheckIn | null> {
		return null
	}

	async findManyByUserId(userId: string, page: number): Promise<ICheckIn[]> {
		return []
	}

	async countByUserId(userId: string): Promise<number> {
		return 0
	}
}
