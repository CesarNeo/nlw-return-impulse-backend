import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from '../mailAdapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '40b18ed5ad3d98',
    pass: 'bfe8525e65c0d8'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Cesar Emmanuel <cesaremmmanul@gmail.com>',
      subject,
      html: body
    })
  }
}
