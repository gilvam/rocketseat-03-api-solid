import { FetchUserCheckInsHistoryUseCase } from '@/use-cases/fetch-user-check-ins-history.use-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export class MakeFetchUserCheckInsHistoryFactory {
	private checkInsRepository = new PrismaCheckInsRepository()

	build() {
		return new FetchUserCheckInsHistoryUseCase(this.checkInsRepository)
	}
}
