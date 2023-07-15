import { prisma } from '@/lib/prisma'
import {
	ICheckIn,
	ICheckInCreateInput,
	ICheckInsRepository,
} from '@/repositories/check-ins-repository.interface'

export class CheckInsRepository implements ICheckInsRepository {
	async create(data: ICheckInCreateInput): Promise<ICheckIn> {
		const checkIn = await prisma.checkIn.create({ data })
		return checkIn
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
}
