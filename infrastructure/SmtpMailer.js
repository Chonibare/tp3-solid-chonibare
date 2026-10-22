export class SmtpMailer { constructor() { this.outbox = []; } send({ to, subject, body }) { this.outbox.push({ via: "smtp", to, subject, body }); } }
