import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { SearchGymUseCase } from '@/use-cases/search-gym.use-case'

export class MakeSearchGymFactory {
	private gymsRepository = new PrismaGymsRepository()

	build() {
		return new SearchGymUseCase(this.gymsRepository)
	}
}
