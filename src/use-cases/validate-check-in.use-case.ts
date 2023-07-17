import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins.repository'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'

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
		const checkIn = await this.checkInsRepository.findById(checkInId)

		if (!checkIn) {
			throw new ResourceNotFountError()
		}

		checkIn.validated_at = new Date()

		await this.checkInsRepository.saveUpdate(checkIn)

		return { checkIn }
	}
}
