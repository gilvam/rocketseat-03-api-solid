import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '@/use-cases/check-in.use-case'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { Prisma } from '.prisma/client'
import { Decimal } from 'prisma/prisma-client/runtime'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
	beforeEach(() => {
		checkInsRepository = new InMemoryCheckInsRepository()
		gymsRepository = new InMemoryGymsRepository()
		sut = new CheckInUseCase(checkInsRepository, gymsRepository)

		gymsRepository.list.push({
			id: 'gym-01',
			title: '',
			description: '',
			phone: '',
			latitude: new Decimal(-37.818748),
			longitude: new Decimal(144.954138),
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -37.818748,
			userLongitude: 144.954138,
		})

		expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

		await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -37.818748,
			userLongitude: 144.954138,
		})

		await expect(() =>
			sut.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: -37.818748,
				userLongitude: 144.954138,
			}),
		).rejects.toBeInstanceOf(Error)
	})

	it('should not be able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
		await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -37.818748,
			userLongitude: 144.954138,
		})

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
		const { checkIn } = await sut.execute({
			userId: 'user-01',
			gymId: 'gym-01',
			userLatitude: -37.818748,
			userLongitude: 144.954138,
		})
		await expect(checkIn.id).toEqual(expect.any(String))
	})

	it('should not be able to check in on distance gym', async () => {
		gymsRepository.list.push({
			id: 'gym-02',
			title: '',
			description: '',
			phone: '',
			latitude: new Decimal(-37.818706),
			longitude: new Decimal(144.954104),
		})

		await expect(() =>
			sut.execute({
				userId: 'user-01',
				gymId: 'gym-02',
				userLatitude: -37.815436,
				userLongitude: 144.952573,
			}),
		).rejects.toBeInstanceOf(Error)
	})
})
