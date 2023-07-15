import {
	IGym,
	IGymCreateInput,
	IGymsRepository,
} from '@/repositories/gyms-repository.interface'

export class InMemoryGymsRepository implements IGymsRepository {
	list: IGym[] = []

	async create(data: IGymCreateInput): Promise<IGym> {
		const gym: IGym = {
			id: 'gym-1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			create_at: new Date(),
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
