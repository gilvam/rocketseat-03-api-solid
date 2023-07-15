import { RegisterUseCase } from '@/use-cases/register.use-case'
import { UsersRepository } from '@/repositories/users.repository'

export function makeRegisterUseCase() {
	const usersRepository = new UsersRepository()
	const registerUseCase = new RegisterUseCase(usersRepository)

	return registerUseCase
}
