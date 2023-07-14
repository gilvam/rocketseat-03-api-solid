import { hash } from 'bcryptjs'
import { IUsersRepository } from '@/repositories/users-repository.interface'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.model'
import { User } from '@prisma/client'

interface IRegisterUseCase {
	name: string
	email: string
	password: string
}

interface IRegisterUserCaseResponse {
	user: User
}

export class RegisterUseCase {
	constructor(private usersRepository: IUsersRepository) {}

	async execute({
		name,
		email,
		password,
	}: IRegisterUseCase): Promise<IRegisterUserCaseResponse> {
		const passwordHash = await hash(password, 6)
		const userWithSameEmail = await this.usersRepository.findByEmail(email)

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError()
		}

		const user = await this.usersRepository.create({
			name,
			email,
			password_hash: passwordHash,
		})

		return {
			user,
		}
	}
}
