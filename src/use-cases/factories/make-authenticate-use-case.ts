import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'
import { UsersRepository } from '@/repositories/users.repository'

export function makeAuthenticateUseCase() {
	const usersRepository = new UsersRepository()
	const authenticateUseCase = new AuthenticateUseCase(usersRepository)

	return authenticateUseCase
}
