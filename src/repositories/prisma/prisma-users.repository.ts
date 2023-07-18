import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IUsersRepository } from '@/repositories/users-repository.interface'

export class PrismaUsersRepository implements IUsersRepository {
	async findById(id: string) {
		return prisma.user.findUnique({ where: { id } })
	}

	async findByEmail(email: string) {
		return prisma.user.findUnique({ where: { email } })
	}

	async create(data: Prisma.UserCreateInput) {
		return prisma.user.create({ data })
	}
}
