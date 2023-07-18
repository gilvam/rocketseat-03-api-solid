import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics.use-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export class MakeGetUserMetricsFactory {
	private checkInsRepository = new PrismaCheckInsRepository()

	build() {
		return new GetUserMetricsUseCase(this.checkInsRepository)
	}
}
