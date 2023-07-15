import { Prisma, User } from '@prisma/client'

export interface IUserCreateInput extends Prisma.UserCreateInput {}
export interface IUser extends User {}

export interface IUsersRepository {
	create(data: IUserCreateInput): Promise<IUser>
	findById(id: string): Promise<IUser | null>
	findByEmail(email: string): Promise<IUser | null>
}
