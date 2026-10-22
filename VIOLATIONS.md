# Violations des principes SOLID constatées

## 1. Single Responsibility Principle (SRP)

La classe initiale ReportService regroupait plusieurs responsabilités :
- lecture des commandes ;
- calcul des statistiques ;
- génération des rapports ;
- gestion des formats ;
- journalisation ;
- envoi des e-mails.

Cette concentration rendait la classe difficile à tester et à faire évoluer.

## 2. Open/Closed Principle (OCP)

L'ajout d'un nouveau format de rapport nécessitait auparavant de modifier la logique centrale de génération.

Les formateurs séparés et FormatterRegistry permettent d'ajouter un format sans multiplier les conditions dans ReportService.

## 3. Liskov Substitution Principle (LSP)

L'héritage utilisé pour restreindre les rapports gratuits pouvait modifier les comportements attendus du service parent.

Une politique injectée est préférable à une sous-classe qui change les règles du service.

## 4. Interface Segregation Principle (ISP)

Une classe qui gérait toutes les opérations obligeait ses dépendances à être associées à trop de responsabilités.

Les composants séparés (repository, mailer, logger et formatters) limitent les rôles de chaque élément.

## 5. Dependency Inversion Principle (DIP)

Le service dépendait directement de détails techniques pour certaines opérations.

L'injection du repository, du mailer, du logger et de la policy permet de remplacer ces dépendances et de faciliter les tests.
