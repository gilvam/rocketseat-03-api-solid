import { CheckIn } from '@prisma/client'
import { ICheckInsRepository } from '@/repositories/check-ins-repository.interface'
import { IGymsRepository } from '@/repositories/gyms-repository.interface'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'
import { getDistanceBetweenTwoCoordinates } from '@/use-cases/_utils/get-distance-between-two-coordinates'
import { MaxNumbersOfCheckInsError } from '@/use-cases/errors/max-numbers-of-check-ins-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'

interface ICheckinUseCaseRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface ICheckinUseCaseResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: ICheckInsRepository,
		private gymsRepository: IGymsRepository,
	) {}

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: ICheckinUseCaseRequest): Promise<ICheckinUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFountError()
		}

		const distance = getDistanceBetweenTwoCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		)

		const MAX_DISTANCE_IN_KILOMETERS = 0.1

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError()
		}

		const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSameDay) {
			throw new MaxNumbersOfCheckInsError()
		}

		const checkIn = await this.checkInsRepository.create({
			user_id: userId,
			gym_id: gymId,
			validated_at: '',
		})

		return { checkIn }
	}
}
