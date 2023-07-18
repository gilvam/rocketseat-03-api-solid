import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms.repository'
import { FetchNearByGymsUseCase } from '@/use-cases/fetch-nearby-gyms.use-case'

export class MakeFetchNearbyGymsFactory {
	private gymsRepository = new PrismaGymsRepository()

	build() {
		return new FetchNearByGymsUseCase(this.gymsRepository)
	}
}
