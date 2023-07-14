import { prisma } from '@/lib/prisma'
import {
	IUser,
	IUserCreateInput,
	IUsersRepository,
} from '@/repositories/users-repository.interface'

export class UsersRepository implements IUsersRepository {
	async create(data: IUserCreateInput): Promise<IUser> {
		const user = await prisma.user.create({ data })
		return user
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await prisma.user.findUnique({ where: { email } })
		return user
	}
}
