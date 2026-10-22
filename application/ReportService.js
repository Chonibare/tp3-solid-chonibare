import { calculateSalesStats } from '../domain/salesStats.js';
import { EmailAddress } from '../domain/EmailAddress.js';
import { FormatterRegistry } from '../formatters/FormatterRegistry.js';
import { CsvFormatter } from '../formatters/CsvFormatter.js';
import { HtmlFormatter } from '../formatters/HtmlFormatter.js';
import { JsonFormatter } from '../formatters/JsonFormatter.js';
import { MarkdownFormatter } from '../formatters/MarkdownFormatter.js';
import { JsonFileOrderRepository } from '../infrastructure/JsonFileOrderRepository.js';
import { SmtpMailer } from '../infrastructure/SmtpMailer.js';
import { ConsoleLogger } from '../infrastructure/ConsoleLogger.js';

export class ReportService {
  constructor({
    repository = new JsonFileOrderRepository(),
    mailer = new SmtpMailer(),
    logger = new ConsoleLogger(),
    policy = { assertAllowed() {} },
  } = {}) {
    this.repository = repository;
    this.mailer = mailer;
    this.logger = logger;
    this.policy = policy;

    this.registry = new FormatterRegistry([
      ['csv', new CsvFormatter()],
      ['html', new HtmlFormatter()],
      ['json', new JsonFormatter()],
      ['markdown', new MarkdownFormatter()],
    ]);
  }

  get outbox() {
    return this.mailer.outbox;
  }

  get history() {
    return this.logger.history;
  }

  generate(month, format = 'csv', recipient) {
    const email = recipient === undefined ? null : new EmailAddress(recipient);

    const orders = this.repository.findAll();
    const stats = calculateSalesStats(orders, month);

    this.policy.assertAllowed(format);
    const report = this.registry.format(format, stats);

    this.logger.log(`Rapport ${month} généré au format ${format}`);

    if (email) {
      this.mailer.send({
        to: email.value,
        subject: `Rapport des ventes - ${month}`,
        body: report,
      });
    }

    return report;
  }

  sendByEmail(month, format, recipient) {
    const email = new EmailAddress(recipient);
    const body = this.generate(month, format);

    this.mailer.send({
      to: email.value,
      subject: `Rapport des ventes - ${month}`,
      body,
    });

    return true;
  }
}

