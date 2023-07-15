import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'
import { InvalidCredetialsError } from '@/use-cases/errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
	it('should be able to register', async () => {
		const userRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateUseCase(userRepository)

		await userRepository.create({
			name: 'John Doe',
			email: 'johndo@example.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			email: 'johndo@example.com',
			password: '123456',
		})

		expect(user.id).toEqual(expect.any(String))
	})

	it('should not be able to authenticate with wrong email', async () => {
		const userRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateUseCase(userRepository)

		expect(() =>
			sut.execute({
				email: 'johndo@example.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredetialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		const userRepository = new InMemoryUsersRepository()
		const sut = new AuthenticateUseCase(userRepository)

		await userRepository.create({
			name: 'John Doe',
			email: 'johndo@example.com',
			password_hash: await hash('123456', 6),
		})

		expect(() =>
			sut.execute({
				email: 'johndo@example.com',
				password: '1',
			}),
		).rejects.toBeInstanceOf(InvalidCredetialsError)
	})
})
