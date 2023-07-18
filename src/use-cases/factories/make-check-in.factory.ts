import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { CheckInUseCase } from '@/use-cases/check-in.use-case'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'

export class MakeCheckInFactory {
	private checkInsRepository = new PrismaCheckInsRepository()
	private gymsRepository = new PrismaGymsRepository()

	build() {
		return new CheckInUseCase(this.checkInsRepository, this.gymsRepository)
	}
}
