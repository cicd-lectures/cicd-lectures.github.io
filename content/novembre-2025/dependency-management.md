+++
weight = 100
+++

{{% section %}}

{{< slide template="invert" >}}

## La Gestion de Dépendances

---

## Pourquoi réutiliser du code et des outils?

- 🧱 L'informatique moderne est un assemblage de briques logicielles
- ⚙️ ... chacune des briques étant infiniment complexe
  - Ex: TLS, PostgresSQL, Linux, Firefox...
- 🤔 Il est difficilement envisageable de démarrer un projet sans réutiliser des briques logicielles.
- 🧘 Cela permet de **concentrer son effort de développement sur ce qui apporte de la valeur**.
  - ➡️ Dans notre cas, notre métier est la gestion de véhicules, pas l'implémentation d'une pile réseau et d'un serveur HTTP.

---

## ⚠️ Ajouter une dépendance n'est pas un acte anodin ⚠️

- Si votre dépendance ne fonctionne plus ou est compromise, votre livrable sera impacté
- Attention à ne pas rajouter une dépendance trop grosse pour n'utiliser qu'une petite fonctionnalité!
- Attention aux dépendances de vos dépendances 😱
- Quelques règles d'usage:
  - Vérifier que votre dépendance est activement maintenue? (date du dernier commit, existence d'une communauté autour)
  - 👀 le code. Est-ce que vous le comprenez? Est-ce que vous pourriez le debugger ou le faire vous même?

---

## Dépendre de librairies externes pose une quantité de problèmes!

- Comment récupérer l'intégralité du code dont on à besoin?
- Comment maintenir à jour ce code?
- Comment s'assurer qu'il n'a pas été modifié?
- Comment garantir la reproductibilité de ce processus?

---

{{<figure src="/images/dependency-graph.png" width=1024 >}}

Mais le pire, c'est que c'est un problème récursif! Nos dépendances ont aussi des dépendances!

---

{{<figure src="/images/npm-dependency-graph.webp" width=1024 >}}

---

{{<figure src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHRxYmd1bGtjcTNyZmh1dXoxaWZsd3g5NWdiem40OW96YzFlbm12YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HUkOv6BNWc1HO/giphy.gif" width=1024 >}}

---

## Un peu de terminologie

- Une *dépendance* est une librairie de code externe ou un outil qui fournit une fonctionnalité.
- On distingue deux types de dépendances:
  - *dépendance directe*: référencée directement par notre application
  - *dépendance transitive*: référencée par une des librairies dont l'application dépends

---

## Comment gérer ses dépendances?

- On introduit un outil de gestion de dépendances
  - Permets au développeur de définir une liste de dépendances en fixant ou en plaçant une contrainte de version (ex <= 4.3.0)
  - Cela permet de construitruire un arbre de dépendances
  - Télécharge toutes les dépendances dans l'environment d'exécution et les mets à disposition de l'application.

---

## Comment cela fonctionne avec Javascript?

{{<figure src="/images/jsmeme2.webp" width=512 >}}

---

{{<figure src="/images/npm.png" width=512 >}}

---

## NPM kesako?

- [Node Package Manager](https://npmjs.com)
- Package Manager et infrastructure de distribution de paquets (registry)
- Gère aussi bien les dépendances de code que les outils
- Des alternatives existent (yarn et pnpm)

---

## Du coup c'est quoi un paquet?

- Un fichier ou un répertoire décrit par un fichier `package.json`
- Un paquet peut mettre à disposition:
  - Un module Javascript / Typescript
  - Des scripts exécutables
    - Pour lancer un script il vous faut utiliser la commande `npx <script>`

---

## 🎓 Exercice: Initialisez un nouveau paquet NPM

- Dans le répertoire `/workspace/devenv/vehicle-server`
  - Lancez la comande `npm init`
  - Répondez aux questions posées
- Observez ensuite le fichier généré

---

## Le fichier `package.json`

- Fichier décrivant un `paquet` npm
- Contient des métadonées a propos du paquet
- Et surtout, la liste des paquets dont dépends notre projet!
  - ℹ️ Ses dépendances directes

---

## Zoom sur les dépendances

`npm` distingue quatre types de dépendances:

- Dépendances de **prodution**: nécessaires a l'exécution du projet
- Dépendances de **développement**: nécessaires au développement du projet (option `--save-dev`)
- Dépendances de **peers**: contraint des versions entres packages (option `--save-peers`)
- Dépendances **optionelles**: dépendances non nécessaires mais pouvant ajouter des fonctionalités  (option `--save-optional`)

---

⚠️ Selon où vous utilisez npm, vous n'avez pas besoin de toutes les dépendances ⚠️

**Exemple**: Quand je suis dans mon environement de production, je n'ai pas besoin d'avoir mes outils de dévelopement

---

## Comment NPM gère les dépendances transitives?

- Certains paquets (la majorité) ont aussi des dépendances, qui deviennent indirectement des dépendances de notre projet
- npm télécharge chacune des dépendances de chacun des parquets et les écrit dans `node_modules`
  - Oui la taille du répertoire `node_modules` est un problème 😭
- ☢️ Cela signifie que plusieurs versions d'une meme paquet peut etre présent dans l'arbre de dépendance d'un projet!

---

## Visualiser l'arbre de dépendances

- `npm ls` permets de lister les dépendances d'un projet (`--all` affiche tout l'arbre de dépendance!)
- [Ce site]("https://npmgraph.js.org) permets d'afficher l'arbre de dépendance d'un paquet public NPM

---

## 🎓 Exercice: Ajoutez Typescript comme dépendance

- Il nous faut typescript d'installé pour pouvoir générer du Javascript
- Le package se trouve [ici](https://www.npmjs.com/package/typescript)
- Quels sont les fichiers / répertoires changés ou créés par npm? Quels sont leur roles?

---

## ✅ Exercice: Ajoutez Typescript comme dépendance

- `npm install --save-dev typescript`
  - ⚠️ `-D` ou `--save-dev`: Typescript n'est pas utile a l´exécution!
- Une section `devDependencies` est ajoutée au `package.json`
  - `typescript` est listé avec la version `^5.9.3`
- Un mystérieux fichier `package-lock.json` est aussi généré!
- Enfin un répertoire `node_modules` est créé content le code du package `typescript`!

---

## Configurer le Compilateur Typescript

`tsc` nécessite un fichier de configuration `tsconfig.json` pour fonctionner.

Créez ce fichier et ajoutez le contenu suivant:

```json
{
  "compilerOptions": {
    "target": "es2020",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "module": "commonjs",                                /* Specify what module code is generated. */
    "outDir": "dist",                                   /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

---

## Versions

NPM suit un standard pour exprimer des versions appelé `semantic versioning`

{{< figure src="/images/semver.png" width=1024 >}}

---

Un changement ne **changeant pas le périmètre fonctionnel** incrémente le numéro de version **patch**.

{{% small %}}
Par exemple: une correction de bug
{{% /small %}}

---

Un changement changeant **le périmètre fonctionnel de façon rétrocompatible** incrémente le numéro de version **mineure**.

{{% small %}}
Par exemple: L'ajout d'une nouvelle fonction dans une librairie
{{% /small %}}

---

Un changement changeant **le périmètre fonctionnel de façon rétrocompatible** incrémente le numéro de version **mineure**.

{{% small %}}
Par exemple: L'ajout d'une nouvelle fonction dans une librairie
{{% /small %}}

---

Un changement changeant **le périmètre fonctionnel de façon non rétrocompatible** incrémente le numéro de version **majeure**.

{{% small %}}
Par exemple: Le retrait d'une fonction dans une librairie
{{% /small %}}

---

On résume

- Changer de version mineure ne *devrait avoir* aucun d’impact sur votre code.
- Changer de version majeure peut nécessiter des adaptations.

---

Mais tout ça dépends du bon vouloir et de la rigueur des mainteneurs 😅

---

## Contraindre des versions avec NPM

`typescript` est listé avec la version `^5.9.3` (notez le `^`), qu'est ce que cela signifie?

---

NPM liste en dépendance des `ranges` de versions, cela signifie:

- `^` : Toutes les versions ayant la meme version majeure
  - exemple: `5.6.4`, `5.9.10`, `5.48.4`
- `~` : Toutes les versions ayant la meme version mineure
  - exemple: `5.6.4`, `5.6.5`, `5.6.6`
- `>`, `>=` : Toutes les version superieures a la version indiquée
  - exemple:`5.6.4`, `6.4.3` etc...
- `5.6.4`: Un range d'une valeur unique... on fixe la version

---

`npm install` permets de contraindre l'installation d'un paquet dans une certaine version

```bash
npm install is-true@4.3.0 # <- installera is true avec la contrainte ^4.3.0
```

---

## Comment NPM fonctionne?

1. Prends les dépendances listées dans un fichier `package.json`
2. Résouds toutes les dépendances (transitives et directes) vers la plus grande version autorisée et disponible
3. Télécharge l'arbre de dépendance et l'écrit dans le répertoire `node_modules`

---

Vous voyez un problème?

---

Que se passe t'il si, entre deux installations, une nouvelle version autorisée par la liste des dépendances est publiée?

---

{{<figure src="/images/reproductibility.jpg" width=1024 >}}

---

## ⚠️  L'installation des paquets NPM n'est pas reproductible!

- Les paquets installés peuvent changer d'une installation l'autre!
- Les contraintes de versions exprimées ne suffisent pas "figer" un arbre de dépendance!
    - On peut figer ses dépendances directes, mais aucune garantie que les dites dépendances feront de même avec les leurs!
- 😭 Cela peut introduire des problèmes!
- 💀 ... ou pire [être un vecteur d'attaque](https://www.sonatype.com/blog/npm-project-used-by-millions-hijacked-in-supply-chain-attack)!

---

## Solution: le fichier `package-lock.json`

- C'est une photo qui capture l'arbre de dépendances complet et permets á NPM d'installer exactement le même arbre!
- Il capture pour chaque dépendance:
  - La `version` exacte utilisée
  - L'URL de téléchargement du paquet (`resolved`)
  - Une somme de contrôle de l'archive téléchargée (`integrity`), qui permet de vérifier que l'archive téléchargée n'est pas altérée

</br>
</br>

🎓 Que continent votre fichier `package-lock.json`? Quelle est la particularité du paquet `typescript`?

---

## 🎓 Exercice: Installez les dépendances nécessaires pour transpiler et exécuter le projet!

- Pour compiler:
  - Il nous faut les définitions de types des libraries JS utilisées (paquets `@types/xxxx`)
  - Les définitons [de types de NodeJS](https://www.npmjs.com/package/@types/node)
- Pour exécuter:
  - Il nous faut le framework web [express](https://www.npmjs.com/package/express) **en version 5.0.1**!
  - Il nous faut aussi la lib [pg](https://www.npmjs.com/package/pg), pour se connecter à la base de donnée
- Faites attention a bien différencier les dépendances d'exécution, des dépendances de développement

---

Voici les commandes pour compiler et lancer le serveur

```bash
# Lancer le serveur de base de données (si il n'existe pas déja!)
docker run -d -name vehicle-database -e POSTGRES_USER=vehicle -e POSTGRES_PASSWORD=vehicle -e POSTGRES_DB=vehicle -p 5432:5432 postgis/postgis:16-3.4-alpine
# Compile le serveur de Typescript vers Javascript
npx tsc
# Lance le serveur javascript
node dist/index.js
# Vous pouvez ensuite rejouer les requètes du README!
```

---

## ✅ Solution: Installez les dépendances nécessaires pour transpiler et exécuter le projet!

```bash
npm install --save-dev @types/express @types/node @types/pg
npm install express@5.0.1 pg

rm -rf dist/
npx tsc
node dist/index.js
```

(Bonus) Combien de dépendances ont été installées au total? 😱

---

## Audit de dépendances

- Du coup cette petite aventure nous aura fait installer **107 paquets**!
- Il est virtuellement impossible d'aller auditer soi même toutes ces dépendances!
- npm fournit une commande `audit` qui permets de détecter (voir même de corriger automatiquement) des problèmes de sécurité sur l'arbre de dépendances!
  - ⚠️ Toutes les failles de sécurité ne se valent pas ([exemple](https://daniel.haxx.se/blog/2023/08/26/cve-2020-19909-is-everything-that-is-wrong-with-cves/))
  - ⚠️  Cela n'empêche pas d'aller mettre son nez dans le code de certaines de vos dépendances

---

## Scripts NPM

NPM permets de définir dans le fichier `package.json` des scripts exécutables via la commande `npm run <script-name>`
Cela permets de "normaliser" les commandes utilisées pour travailler avec un projet

```
// package.json
{
  // ...
  "scripts": {
    "build": "rm -rf ./dist && tsc",
    "start": "npm run build && node dist/index.js",
    "start-db": "docker container run -d -name vehicle-database -e POSTGRES_USER=vehicle -e POSTGRES_PASSWORD=vehicle -e POSTGRES_DB=vehicle -p 5432:5432 postgis/postgis:16-3.4-alpine",
    "stop-db": "docker container rm -f vehicle-database"
  },
  // ...
}
```

🎓 Ajoutez ces `scripts` a votre fichier `package.json`, vous pourrez utiliser ensuite les commandes suivantes

```bash
npm run start-db
npm run start
npm run stop-db
```

---

## Checkpoint 🎯

- Nous avons vu les défis de la gestion de dépendance et le fonctionnement de NPM!
- Un paquet npm sans `package-lock.json` n'est pas reproductible!
- Nous sommes maintenant capable de compiler et d'exécuter notre projet!
  - C'est une étape importante, créez donc un commit pour sauvegarder ça!

{{% /section %}}
