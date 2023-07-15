import {
	IGym,
	IGymCreateInput,
	IGymsRepository,
} from '@/repositories/gyms-repository.interface'
import { randomUUID } from 'node:crypto'
import { Prisma } from '@prisma/client'

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

	async findByEmail(email: string): Promise<IGym | null> {
		return this.list.find((it) => it.email === email) || null
	}
}
