import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { RegisterUseCase } from '@/use-cases/register.use-case'

export class MakeRegisterFactory {
	private usersRepository = new PrismaUsersRepository()

	build() {
		return new RegisterUseCase(this.usersRepository)
	}
}
