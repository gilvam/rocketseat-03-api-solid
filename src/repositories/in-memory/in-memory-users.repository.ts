import {
	IUser,
	IUserCreateInput,
	IUsersRepository,
} from '@/repositories/users-repository.interface'

export class InMemoryUsersRepository implements IUsersRepository {
	userList: IUser[] = []

	async create(data: IUserCreateInput): Promise<IUser> {
		const user: IUser = {
			id: 'user-1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			create_at: new Date(),
		}

		this.userList.push(user)

		return user
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return this.userList.find((it) => it.email === email) || null
	}
}
