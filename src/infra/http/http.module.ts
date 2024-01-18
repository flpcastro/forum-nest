import { Module } from '@nestjs/common'
import { CreateAccountController } from '../http/controllers/create-account.controller'
import { AuthenticateController } from '../http/controllers/authenticate.controller'
import { CreateQuestionController } from '../http/controllers/create-question.controller'
import { FetchRecentQuestionsController } from '../http/controllers/fetch-recent-questions.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
	controllers: [
		CreateAccountController, 
		AuthenticateController, 
		CreateQuestionController, 
		FetchRecentQuestionsController
	],
	providers: [PrismaService],
})
export class HttpModule {}