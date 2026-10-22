export class MarkdownFormatter {
  format(stats) {
    let output = `# Ventes ${stats.month}\n\n`;
    output += `- Commandes : ${stats.count}\n`;
    output += `- Panier moyen : ${stats.average} €\n\n`;
    output += '| Catégorie | Montant HT |\n|---|---:|\n';

    for (const category of Object.keys(stats.byCategory).sort()) {
      output += `| ${category} | ${stats.byCategory[category]} € |\n`;
    }

    output += `\n**Total HT : ${stats.revenueHT} €**\n\n`;
    output += `**TVA : ${stats.vat} €**\n\n`;
    output += `**Total TTC : ${stats.revenueTTC} €**\n`;
    return output;
  }
}
