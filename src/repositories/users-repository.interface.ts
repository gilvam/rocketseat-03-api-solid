import { Prisma, User } from '@prisma/client'

export interface IUserCreateInput extends Prisma.UserCreateInput {}
export interface IUser extends User {}

export interface IUsersRepository {
	create(data: IUserCreateInput): Promise<IUser>
	findByEmail(email: string): Promise<IUser | null>
}
