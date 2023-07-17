import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInCreateInput
	extends Prisma.CheckInUncheckedCreateInput {}
export interface ICheckIn extends CheckIn {}

export interface ICheckInsRepository {
	create(data: ICheckInCreateInput): Promise<ICheckIn>
	saveUpdate(checkIn: ICheckIn): Promise<ICheckIn>
	findById(id: string): Promise<ICheckIn | null>
	findByUserIdOnDate(userId: string, date: Date): Promise<ICheckIn | null>
	findManyByUserId(userId: string, page: number): Promise<ICheckIn[]>
	countByUserId(userId: string): Promise<number>
}
