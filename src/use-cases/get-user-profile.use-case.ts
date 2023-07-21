import { IUsersRepository } from '@/repositories/users-repository.interface'
import { User } from '@prisma/client'
import { ResourceNotFountError } from '@/use-cases/errors/resource-not-fount-error'

interface IGetUserProfileUseCaseRequest {
	userId: string
}

interface IGetUserProfileUseCaseResponse {
	user: User
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		userId,
	}: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new ResourceNotFountError()
		}

		return { user }
	}
}
