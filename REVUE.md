# Revue du refactoring SOLID

## Objectif
Refactoriser le service de generation des rapports de ventes tout en preservant son comportement observable.

## Architecture retenue
- domain/ : validation des adresses e-mail et calcul des statistiques.
- application/ : orchestration des rapports et politique d'autorisation.
- formatters/ : generation des formats CSV, HTML, JSON et Markdown.
- infrastructure/ : acces aux commandes, journalisation et envoi des messages.

## Principes SOLID appliques
### SRP - Responsabilite unique
Les responsabilites sont reparties entre plusieurs classes specialisees.

### OCP - Ouvert a l'extension, ferme a la modification
Le registre de formateurs facilite l'ajout de nouveaux formats.

### LSP - Substitution de Liskov
Une politique injectee remplace l'heritage qui modifiait le comportement du service.

### ISP - Segregation des interfaces
Les composants sont separes selon leurs roles : stockage, journalisation, envoi et formatage.

### DIP - Inversion des dependances
ReportService recoit ses dependances par injection, ce qui facilite leur remplacement et les tests.

## Tests de non-regression
Les neuf tests couvrent les rapports existants, un mois sans commande, les formats inconnus, les adresses e-mail, l'envoi de rapports, le CSV d'octobre et le format Markdown.

Commande d'execution : npm test

## Conclusion
Le refactoring ameliore la separation des responsabilites, la testabilite et l'extensibilite tout en preservant les comportements verifies par les tests.
