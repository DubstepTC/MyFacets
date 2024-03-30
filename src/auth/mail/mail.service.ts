import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'mail.ru',
      auth: {
        user: 'myfacets@mail.ru',
        pass: 'pFnBGAkmFchHs8XKfxx3',
      },
    });
  }

  async sendEmail(mailOptions) {
    return await this.transporter.sendMail(mailOptions);
  }
}