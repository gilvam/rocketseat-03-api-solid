import {
	IUser,
	IUserCreateInput,
	IUsersRepository,
} from '@/repositories/interfaces/users-repository.interface'

export class InMemoryUsersRepository implements IUsersRepository {
	list: IUser[] = []

	async create(data: IUserCreateInput): Promise<IUser> {
		const user: IUser = {
			id: 'user-1',
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			create_at: new Date(),
		}

		this.list.push(user)

		return user
	}

	async findById(id: string): Promise<IUser | null> {
		return this.list.find((it) => it.id === id) || null
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return this.list.find((it) => it.email === email) || null
	}
}
