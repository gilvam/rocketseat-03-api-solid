import { IGymsRepository } from '@/repositories/interfaces/gyms-repository.interface'
import { Gym } from '@prisma/client'

interface IFetchNearByGymsUseCase {
	userLongitude: number
	userLatitude: number
}

interface IFetchNearByGymsCaseResponse {
	gyms: Gym[]
}

export class FetchNearByGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		userLongitude,
		userLatitude,
	}: IFetchNearByGymsUseCase): Promise<IFetchNearByGymsCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearBy(
			userLatitude,
			userLongitude,
		)

		return { gyms }
	}
}
