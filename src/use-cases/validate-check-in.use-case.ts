import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'
import dayjs from 'dayjs'

interface IValidateCheckinUseCaseRequest {
	checkInId: string
}

interface IValidateCheckinUseCaseResponse {
	checkIn: CheckIn
}

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		checkInId,
	}: IValidateCheckinUseCaseRequest): Promise<IValidateCheckinUseCaseResponse> {
		const TWENTY_MINUTES = 20
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if (!checkIn) {
			throw new ResourceNotFountError()
		}

		const distanceInMunutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.create_at,
			'minutes',
		)

		if (distanceInMunutesFromCheckInCreation > TWENTY_MINUTES) {
			throw new Error()
		}

		checkIn.validated_at = new Date()

		await this.checkInsRepository.saveUpdate(checkIn)

		return { checkIn }
	}
}
