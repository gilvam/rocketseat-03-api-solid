import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'

export function makeAuthenticateUseCase() {
	const usersRepository = new PrismaUsersRepository()
	const authenticateUseCase = new AuthenticateUseCase(usersRepository)

	return authenticateUseCase
}
