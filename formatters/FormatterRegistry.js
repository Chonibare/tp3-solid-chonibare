import { CsvFormatter } from './CsvFormatter.js';
import { HtmlFormatter } from './HtmlFormatter.js';
import { JsonFormatter } from './JsonFormatter.js';
import { MarkdownFormatter } from './MarkdownFormatter.js';

export class FormatterRegistry {
  constructor() {
    this.formatters = new Map([
      ['csv', new CsvFormatter()],
      ['html', new HtmlFormatter()],
      ['json', new JsonFormatter()],
      ['markdown', new MarkdownFormatter()],
    ]);
  }

  register(name, formatter) {
    this.formatters.set(name, formatter);
  }

  format(name, stats) {
    const formatter = this.formatters.get(name);
    if (!formatter) {
      throw new Error(`Format non supporté : ${name}`);
    }
    return formatter.format(stats);
  }
}
