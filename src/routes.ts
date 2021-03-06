import express from 'express'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter'
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository'
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase'

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
      comment,
      type,
      screenshot
    })

    return res.status(201).send()
  } catch (error) {
    console.log(error)

    return res.status(500).send()
  }
})
