import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import dayjs from 'dayjs'

interface ICheckinUseCaseRequest {
	userId: string
	gymId: string
}

interface ICheckinUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
		gymId,
	}: ICheckinUseCaseRequest): Promise<ICheckinUseCaseResponse> {
		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		// console.log(`checkInOnSameDay: `, checkInOnSameDay)

		if (checkInOnSameDay) {
			throw new Error()
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
			validated_at: '',
		})

		return { checkIn }
	}
}
