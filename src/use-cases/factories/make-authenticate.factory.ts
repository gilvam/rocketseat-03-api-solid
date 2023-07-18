import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'

export class MakeAuthenticateFactory {
	private usersRepository = new PrismaUsersRepository()

	build() {
		return new AuthenticateUseCase(this.usersRepository)
	}
}
