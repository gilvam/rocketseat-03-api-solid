import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { Decimal } from 'prisma/prisma-client/runtime'
import { MaxNumbersOfCheckInsError } from '@/use-cases/errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in.use-case'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInUseCase(checkInsRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to validate the check-in', async () => {
		const createCheckIn = await checkInsRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-01',
			create_at: new Date(),
			validated_at: '',
		})

		const { checkIn } = await sut.execute({
			checkInId: createCheckIn.id,
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
		expect(checkInsRepository.list[0].validated_at).toEqual(expect.any(Date))
	})

	it('should not be able to validate an no existent check-in', async () => {
		await expect(() =>
			sut.execute({ checkInId: 'no-existent-id' }),
		).rejects.toBeInstanceOf(ResourceNotFountError)
	})

	it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
		const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21

		vi.setSystemTime(new Date(2023, 1, 13, 40))
		const createCheckIn = await checkInsRepository.create({
			user_id: 'user-01',
			gym_id: 'gym-01',
			create_at: new Date(),
			validated_at: '',
		})

		vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

		await expect(() =>
			sut.execute({ checkInId: createCheckIn.id }),
		).rejects.toBeInstanceOf(Error)
	})
})
