import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in.use-case'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
	beforeEach(async () => {
		checkInsRepository = new InMemoryCheckInsRepository()
		sut = new ValidateCheckInUseCase(checkInsRepository)
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
})
