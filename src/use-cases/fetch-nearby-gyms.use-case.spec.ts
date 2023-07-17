import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { FetchNearByGymsUseCase } from '@/use-cases/fetch-nearby-gyms.use-case'

let checkInsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch Near By Gyms Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryGymsRepository()
		sut = new FetchNearByGymsUseCase(checkInsRepository)
	})

	it('should be able to fetch nearby gyms', async () => {
		await checkInsRepository.create({
			title: 'Near Gym',
			description: null,
			phone: null,
			latitude: -27.2092052,
			longitude: -49.6401091,
		})

		await checkInsRepository.create({
			title: 'Far Gym',
			description: null,
			phone: null,
			latitude: -27.0610928,
			longitude: -49.5229501,
		})

		const { gyms } = await sut.execute({
			userLatitude: -27.2092052,
			userLongitude: -49.6401091,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
	})
})
