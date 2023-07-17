import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { SearchGymUseCase } from '@/use-cases/search-gym.use-case'
import { Decimal } from 'prisma/prisma-client/runtime'

let checkInsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryGymsRepository()
		sut = new SearchGymUseCase(checkInsRepository)
	})

	it('should be able to search gyms', async () => {
		await checkInsRepository.create({
			title: 'Javascript Gym',
			description: null,
			phone: null,
			latitude: -37.818706,
			longitude: 144.954104,
		})

		await checkInsRepository.create({
			title: 'Typescript Gym',
			description: null,
			phone: null,
			latitude: -37.818706,
			longitude: 144.954104,
		})

		const { gyms } = await sut.execute({
			query: 'Javascript',
			page: 1,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript Gym' }),
		])
	})

	it.skip('should be able to fetch pagineted gym search', async () => {
		for (let i = 1; i <= 22; i++) {
			await checkInsRepository.create({
				title: `Javascript Gym ${i}`,
				description: null,
				phone: null,
				latitude: -37.818706,
				longitude: 144.954104,
			})
		}

		const { gym } = await sut.execute({
			query: 'Javascript',
			page: 2,
		})

		expect(gym).toHaveLength(2)
		expect(gym).toEqual([
			expect.objectContaining({ gym_id: 'Javascript Gym 21' }),
			expect.objectContaining({ gym_id: 'Javascript Gym 22' }),
		])
	})
})
