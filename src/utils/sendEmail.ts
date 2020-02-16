import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandboxd0b1d6fdede54a4db81b8bb737985802.mailgun.org',
});

const sendEmail = (to: string, subject: string, html: string) => {
  // 다른 이메일 계정으로 메일을 보내려면 유료 서비스가 필요.
  const emailData: Mailgun.messages.SendData | Mailgun.messages.BatchData = {
    from: 'arta1069@gmail.com',
    to,
    subject,
    html,
  };

  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="https://dillonmemo.github.io/${key}/">here</a>`;
  const to = 'arta1069@gmail.com';

  return sendEmail(to, emailSubject, emailBody);
};
