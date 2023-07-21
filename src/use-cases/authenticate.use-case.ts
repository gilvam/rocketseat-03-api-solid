import { IUsersRepository } from '@/repositories/users-repository.interface'
import { InvalidCredetialsError } from '@/use-cases/errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface IAuthenticateUseCaseRequest {
	email: string
	password: string
}

interface IAuthenticateUseCaseResponse {
	user: User
}

export class AuthenticateUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		email,
		password,
	}: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new InvalidCredetialsError()
		}

		const doesPasswordMatches = await compare(password, user.password_hash)

		if (!doesPasswordMatches) {
			throw new InvalidCredetialsError()
		}

		return { user }
	}
}
