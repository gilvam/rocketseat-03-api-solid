import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile.use-case'

export class MakeGetUserProfileFactory {
	private usersRepository = new PrismaUsersRepository()

	build() {
		return new GetUserProfileUseCase(this.usersRepository)
	}
}
