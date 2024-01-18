import { Either, left, right } from 'src/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'

interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
	constructor(private answersRepository: AnswersRepository) {}

	async execute({
		answerId,
		authorId,
	}: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId)

		if (!answer) {
			return left(new ResourceNotFoundError())
		}

		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError())
		}

		await this.answersRepository.delete(answer)

		return right(null)
	}
}
