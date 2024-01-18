import { Either, left, right } from 'src/core/either'
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

	async execute({
		authorId,
		answerCommentId,
	}: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
		const answerComment = await this.answerCommentsRepository.findById(
			answerCommentId,
		)

		if (!answerComment) {
			return left(new ResourceNotFoundError())
		}

		if (answerComment.authorId.toString() !== authorId) {
			return left(new NotAllowedError())
		}

		await this.answerCommentsRepository.delete(answerComment)

		return right(null)
	}
}
