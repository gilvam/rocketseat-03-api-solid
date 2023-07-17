import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'
import { CheckInsRepository } from '@/repositories/check-ins.repository'

interface IGetUserMetricsUseCaseRequest {
	userId: string
}

interface IGetUserMetricsUseCaseResponse {
	checkInsCount: number
}

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async execute({
		userId,
	}: IGetUserMetricsUseCaseRequest): Promise<IGetUserMetricsUseCaseResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId)

		if (!checkInsCount) {
			throw new ResourceNotFountError()
		}

		return { checkInsCount }
	}
}
