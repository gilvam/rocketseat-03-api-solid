import { IGymsRepository } from '@/repositories/gyms-repository.interface'
import { Gym } from '@prisma/client'

interface ICreateGymUseCase {
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface ICreateGymGymCaseResponse {
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
	}: ICreateGymUseCase): Promise<ICreateGymGymCaseResponse> {
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
