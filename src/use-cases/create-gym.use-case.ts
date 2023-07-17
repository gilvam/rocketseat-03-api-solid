import { IGymsRepository } from '@/repositories/interfaces/gyms-repository.interface'
import { Gym } from '@prisma/client'

interface ICreateGymUseCase {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface ICreateGymCaseResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({
		title,
		description,
		phone,
		latitude,
		longitude,
	}: ICreateGymUseCase): Promise<ICreateGymCaseResponse> {
		const gym = await this.gymsRepository.create({
			title,
			description,
			phone,
			latitude,
			longitude,
		})

		return { gym }
	}
}
