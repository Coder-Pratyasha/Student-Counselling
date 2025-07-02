import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    const info = await transporter.sendMail({
      from: `"PathPilot" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    })

    console.log('Email sent!')
    console.log('Message ID:', info.messageId)
  } catch (error) {
    console.error('Error in sending email:', error.message)
  }
}
