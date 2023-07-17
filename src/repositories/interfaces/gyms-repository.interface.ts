import { Prisma, Gym } from '@prisma/client'

export interface IGymCreateInput extends Prisma.GymCreateInput {}
export interface IGym extends Gym {}

export interface IGymsRepository {
	create(data: IGymCreateInput): Promise<IGym>
	findById(id: string): Promise<IGym | null>
	searchMany(query: string, page: number): Promise<IGym[] | []>
	findManyNearBy(latitude: number, longitude: number): Promise<IGym[] | []>
}
