import {
	IGym,
	IGymCreateInput,
	IGymsRepository,
} from '@/repositories/gyms-repository.interface'
import { randomUUID } from 'node:crypto'
import { Prisma } from '@prisma/client'
import { getDistanceBetweenTwoCoordinates } from '@/use-cases/_utils/get-distance-between-two-coordinates'

export class InMemoryGymsRepository implements IGymsRepository {
	list: IGym[] = []

	async create(data: IGymCreateInput): Promise<IGym> {
		const gym: IGym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Prisma.Decimal(data.latitude.toString()),
			longitude: new Prisma.Decimal(data.longitude.toString()),
		}

		this.list.push(gym)

		return gym
	}

	async findById(id: string): Promise<IGym | null> {
		return this.list.find((it) => it.id === id) || null
	}

	async searchMany(query: string, page: number): Promise<IGym[] | []> {
		return (
			this.list
				.filter((it) => it.title.includes(query))
				.slice((page - 1) * 20, page * 20) || []
		)
	}

	async findManyNearBy(
		latitude: number,
		longitude: number,
	): Promise<IGym[] | []> {
		const MAX_DISTANCE_GYM_KM = 10

		return this.list.filter((it) => {
			const distance = getDistanceBetweenTwoCoordinates(
				{ latitude, longitude },
				{
					latitude: it.latitude.toNumber(),
					longitude: it.longitude.toNumber(),
				},
			)
			return distance < MAX_DISTANCE_GYM_KM
		})
	}
}
