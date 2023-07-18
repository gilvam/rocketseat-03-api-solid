import { IGymsRepository } from '@/repositories/gyms-repository.interface'
import { Gym } from '@prisma/client'

interface ISearchGymUseCase {
	query: string
	page: number
}

interface ISearchGymCaseResponse {
	gyms: Gym[]
}

export class SearchGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		query,
		page,
	}: ISearchGymUseCase): Promise<ISearchGymCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page)

		return { gyms }
	}
}
