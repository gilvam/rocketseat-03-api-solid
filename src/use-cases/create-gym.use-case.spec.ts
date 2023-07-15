import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from '@/use-cases/create-gym.use-case'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
	beforeEach(() => {
		gymsRepository = new InMemoryGymsRepository()
		sut = new CreateGymUseCase(gymsRepository)
	})

	it('should be able to create gym', async () => {
		const { gym } = await sut.execute({
			title: 'Javascript Gym',
			description: null,
			phone: '',
			latitude: -37.818748,
			longitude: 144.954138,
		})

		expect(gym.id).toEqual(expect.any(String))
	})
})
