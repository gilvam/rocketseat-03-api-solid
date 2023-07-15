import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInCreateInput
	extends Prisma.CheckInUncheckedCreateInput {}
export interface ICheckIn extends CheckIn {}

export interface ICheckInsRepository {
	create(data: ICheckInCreateInput): Promise<ICheckIn>
	findByUserIdOnDate(userId: string, date: Date): Promise<ICheckIn | null>
}
