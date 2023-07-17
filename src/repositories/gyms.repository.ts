import { prisma } from '@/lib/prisma'
import {
	IGym,
	IGymCreateInput,
	IGymsRepository,
} from '@/repositories/interfaces/gyms-repository.interface'

export class GymsRepository implements IGymsRepository {
	async create(data: IGymCreateInput): Promise<IGym> {
		const gym = await prisma.gym.create({ data })
		return gym
	}

	async findById(id: string): Promise<IGym | null> {
		const gym = await prisma.gym.findUnique({ where: { id } })
		return gym
	}

	async searchMany(query: string, page: number): Promise<IGym[] | []> {
		return []
	}

	async findManyNearBy(
		latitude: number,
		longitude: number,
	): Promise<IGym[] | []> {
		return []
	}
}
