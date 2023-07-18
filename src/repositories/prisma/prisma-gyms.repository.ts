import {
	IGym,
	IGymCreateInput,
	IGymsRepository,
} from '@/repositories/gyms-repository.interface'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements IGymsRepository {
	async create(data: IGymCreateInput) {
		return prisma.gym.create({ data })
	}

	async findById(id: string) {
		return prisma.gym.findUnique({ where: { id } })
	}

	async findManyNearBy(latitude: number, longitude: number) {
		return prisma.$queryRaw<IGym[]>`
				SELECT *
				from gyms
				WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) *
				                   cos(radians(longitude) - radians(${longitude})) +
				                   sin(radians(${latitude})) * sin(radians(latitude)))) <= 10
		`
	}

	async searchMany(query: string, page: number) {
		return prisma.gym.findMany({
			where: { title: { contains: query } },
			take: 20,
			skip: (page - 1) * 20,
		})
	}
}
