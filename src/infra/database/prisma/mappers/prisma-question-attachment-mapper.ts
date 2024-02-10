import { Attachment as PrismaAttachment } from '@prisma/client'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { QuestionAttachment } from 'src/domain/forum/enterprise/entities/question-attachment'

export class PrismaQuestionAttachmentMapper {
	static toDomain(raw: PrismaAttachment): QuestionAttachment {
		if(!raw.questionId) {
			throw new Error('QuestionAttachment must have an questionId')
		}

		return QuestionAttachment.create({
			attachmentId: new UniqueEntityID(raw.id),
			questionId: new UniqueEntityID(raw.questionId),
		}, new UniqueEntityID(raw.id))
	}
}