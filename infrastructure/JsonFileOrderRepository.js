import fs from 'node:fs';

export class JsonFileOrderRepository {
  constructor(fileUrl = new URL('../orders.json', import.meta.url)) {
    this.fileUrl = fileUrl;
  }

  findAll() {
    return JSON.parse(fs.readFileSync(this.fileUrl, 'utf8'));
  }
}
