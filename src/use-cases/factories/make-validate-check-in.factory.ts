import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in.use-case'

export class MakeValidateCheckInFactory {
	private checkInsRepository = new PrismaCheckInsRepository()

	build() {
		return new ValidateCheckInUseCase(this.checkInsRepository)
	}
}
