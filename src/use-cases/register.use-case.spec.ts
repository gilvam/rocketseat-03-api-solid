import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from '@/use-cases/register.use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

describe('Register Use Case', () => {
	it('should be able to register', async () => {
		const userRepository = new InMemoryUsersRepository()
		const sut = new RegisterUseCase(userRepository)

		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'johndo@example.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should hash user password upon registration', async () => {
		const userRepository = new InMemoryUsersRepository()
		const sut = new RegisterUseCase(userRepository)

		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'johndo@example.com',
			password: '123456',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBeTruthy()
	})

	it('should not be able to register with same email twice', async () => {
		const userRepository = new InMemoryUsersRepository()
		const sut = new RegisterUseCase(userRepository)
		const user = {
			name: 'John Doe',
			email: 'johndo@example.com',
			password: '123456',
		}

		await sut.execute(user)

		await expect(() => sut.execute(user)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		)
	})
})
