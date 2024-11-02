+++
weight = 90
+++

{{% section %}}

{{< slide template="invert" >}}

## Produire un Livrable

---

## 🤔 Quel est le problème ?

On a du code. C'est un bon début. MAIS:

- Le code en lui meme ne délivre pas de valeur,
  - C'est l'exécution de ce programme qui en produit!
- Qu'est ce qu'on "fabrique" à partir du code ?
  - Un **livrable** (un binaire, une image Docker, une application iOS // Android ...)

---

## Caractéristiques de notre livrable 📦

Nous souhaitons que notre livrable soit:

- **Versionné**: Chaque livrable est associé a une version de notre base de code
- **Reproductible**:
  - Il est **possible** et **facile** de générer notre livrable
  - Deux générations de livrables partant d'une meme version génèrent le **"même"** livrable!

---

## Que signifie "reproductible" ?

- Il faut que notre processus de génération de livrable, (le build) soit entièrement **déterministe**.
- Il faut qu'en fonction d'un jeu de paramètres, le résultat du build soit même le "même".
- Il en va de même pour l'environnement ou notre programme est exécuté.
  - Notre environnement de **production**

---

## Quels sont les paramètres de notre livraison ?

- **Le code**: Dans quelle version est-il? Est-il fonctionnel? Est-ce qu'il est sauvegardé?
- **Les dépendances de notre code**: Toutes les libraires utilisés dans notre application.
- **Les outils de génération de livrables**: Quel compilateur et dans quelle version?
- **L'environnement d'exécution cible**: Node 22 ou Node 23? Quelle version de PostgreSQL? Quel OS/Architecture CPU? Quel Navigateur?
- **Le processus de livraison lui même**: Dans quelle mesure la procédure de génération est elle répétable et respectée?

---

## Risques encourus?

- Ne pas etre capable de livrer!
- 😡 Dans le meilleur des cas, votre livrable ne marche pas du tout.
- 🤡 Dans certains cas votre livrable va casser sans explication facile et seulement sur la production du client les jours impairs d'une année bisextile.
  - Allez reproduire et débugger!
- 😱 Livrer votre application va devenir une angoisse permanente
- 😱😭🔥☠️ Vous livrez une CVE ou un malware, avec un accès direct a votre base de données.
  - [Vraiment](https://jfrog.com/blog/malware-civil-war-malicious-npm-packages-targeting-malware-authors)
  - [Vraiment Vraiment](https://www.theregister.com/2023/01/04/pypi_pytorch_dependency_attack)
  - [Vraiment Vraiment Vraiment](https://nvd.nist.gov/vuln/detail/CVE-2021-44228)

---

{{< slide background-image="/images/dumpster-fire.gif" >}}

---

## On en est où la dedans? (1/2)

- **Le code**
  - ✅ On vient de mettre en place git. On sait identifier une version par un hash de commit.
  - ❌ On ne sait pas vraiment dire si l'application "fonctionne" ou pas.
- **Les dépendances de notre code**
  - ❌ On ne sait ni les récupérer, ni les contrôler.
- **Les outils permettant de générer notre livrable**
  - ❌ Typescript 5 est indiqué dans la documentation fournie mais c'est tout

---

## On en est où la dedans? (2/2)

- **L'environnement cible**:
  - ❌ Aucune version de node indiquée.
  - ❌ On sait que l'on à besoin de Postgres et Postgis
- **Le processus de livraison lui même**:
  - ❌ Nous n'avons encore rien défini

---

## Quelles solutions ? (1/2)

- **Le code**
  - ➡️  **Solution** (pour garantir une bonne utilisation): **L'analyse statique (le lint)**
  - ➡️  **Solution** (pour savoir si il fonctionne): **les tests automatisés**
  - ➡️  **Solution** (pour garantir qu'il fonctionne à chaque changement): **l'intégration continue (CI)**
- **Les dépendances du code**
  - ➡️  Solution: Mise en place d'un outil de **gestion et d'audit des dépendances**
- **Les outils de génération du code**:
  - ➡️  Solution: Mise en place d'un processus automatisé de génération de livrable s'expécutant dans un environment controllé

---

## Quelles solutions ? (2/2)

- **L'environnement cible**:
  -  ➡️  Solution: Utilisation *d'outils de packaging* (Docker) pour notre application et son environment cible
- **Le processus de livraison lui même**:
  - ➡️  Solution: définir un *cycle de vie* et en déduire un *processus de livraison*

---

## Les grandes étapes de la génération de notre livrable. 🎯

1. `build`: Compilation de l'application
2. `lint`: Analyse statique de code pour détecter des problèmes ou risques
3. `test`: Exécution de la suite de tests automatisées
4. `package`: Création du livrable
5. `release`: Livraison du livrable

{{% /section %}}
