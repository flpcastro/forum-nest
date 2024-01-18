import { Either, left, right } from 'src/core/either'
import { QuestionCommentsRepository } from 'src/domain/forum/application/repositories/question-comments-repository'
import { NotAllowedError } from 'src/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from 'src/core/errors/errors/resource-not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionCommentUseCase {
	constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

	async execute({
		authorId,
		questionCommentId,
	}: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
		const questionComment = await this.questionCommentsRepository.findById(
			questionCommentId,
		)

		if (!questionComment) {
			return left(new ResourceNotFoundError())
		}

		if (questionComment.authorId.toString() !== authorId) {
			return left(new NotAllowedError())
		}

		await this.questionCommentsRepository.delete(questionComment)

		return right(null)
	}
}
