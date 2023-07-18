import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { CreateGymUseCase } from '@/use-cases/create-gym.use-case'

export class MakeCreateGymFactory {
	private gymsRepository = new PrismaGymsRepository()

	build() {
		return new CreateGymUseCase(this.gymsRepository)
	}
}
