+++
weight = 150
+++

{{% section %}}

{{< slide template="invert" >}}

## Tests Automatisés

---

## Qu'est ce qu'un test ?

C'est du code qui:

- Crée les conditions d'un cas de test (**given**)
- Appelle le système testé (**when**)
- Valide les résultats retourné et les effets de bords du système (**then**)

---

## Pourquoi faire des tests?

- **Objectif**: rendre notre CI capable de détecter des problèmes de logique
- Prouve que le logiciel se comporte comme attendu à tout moment
- Détecte les impacts non anticipés des changements introduits, les **régressions**

---

## Qu'est ce que l'on teste ?

- Une fonction
- Une combinaison de classes
- Un serveur applicatif et une base de données

On parle de **SUT**, System Under Test.

---

## Différents systèmes, Différentes Techniques de Tests

- Test unitaire
- Test d'intégration
- Test de bout en bout
- Smoke tests
- Test de performance

(La terminologie varie d'un développeur / langage / entreprise / écosystème à l'autre)

---

## Test unitaire

- Test validant le bon comportement une unité de code
- Prouve que l'unité de code interagit correctement avec les autres unités.
- Test s'excécutant rapidement, ne nécessite aucune infrastructure.
- Les autres composants dont l'unité de code dépends sont "bouchonnés", cela pour garantir leur simplicité et leur facilité.
  - Par Exemple: la couche d'accès a la base de données est réimplémentée en mémoire.

---

## Tests et Jabbascript

{{< figure src="/images/jabbascript.jpg" >}}

---

- Javascript / Typescript ne fourni pas de framework de tests, Il nous faut en installer un nous même
- On se propose d'utiliser [Jest](https://jestjs.io)
- Permets de décrire des tests, faire des assertions et définir des mocks simplement, tout en un!
- La encore, hautement configurable et extensible!

---

## Jest & Typescript

- Jest est conçu pour décrire des tests en Javascript...
- Pour utiliser Typescript, il nous faut utiliser un [transformer](https://jestjs.io/docs/code-transformation) Jest qui transforme les tests décrits en Typescript vers Javascript
- Plusieurs options existent. On se propose d'utiliser [ts-jest](https://kulshekhar.github.io/ts-jest/docs)

---

## 🎓 Exercice: Installez Jest et ts-jest🐛

- Dans une nouvelle branche à jour de main!
- Suivez [la procédure d'installation de ts-jest](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)
- Faites aussi en sorte que la commande `npm run test` appelle `jest`

---

## ✅ Solution:  Installez Jest et ts-jest🐛

1. Installation du framework de test

```bash
# Installation des dépendances
npm install --save-dev jest ts-jest @types/jest

# Initialisation de la configuration de jest
npx ts-jest config:init
```

2. Ajout du script test dans le fichier `package.json`

```json
{
...
  "scripts":{
    // ...
    "test": "jest"
  }
}

```

3. On excécute la suite de tests

```bash
npm run test
```

---

Vous deviez obtenir ce message d'erreur!


```bash
No tests found, exiting with code 1
Run with `--passWithNoTests` to exit with code 0
In /workspace/vehicle-server-ts
  23 files checked.
  testMatch: **/__tests__/**/*.[jt]s?(x), **/?(*.)+(spec|test).[tj]s?
```

Bon c'est bien sympa, mais il faudrait ajouter notre premier test.

---

## Nous avons un bug...

Apparament lorsque l'on essaye de créér un véhicule

```bash
curl \ 
    -H "Content-Type: application/json" \ 
    --data '{"shortcode":"abbc", "battery": 12, "latitude": 53.43, "longitude": 43.43}' \ 
    localhost:8080/vehicles | jq .
```

Le serveur nous réponds

```json
{
  "error": {
    "code": 2,
    "message": "Invalid create vehicle request",
    "details": {
      "violations": [
        "Shortcode must be only 4 characters long"
      ]
    }
  }
}
```

Pourtant le shortcode donné est `abbc`, du coup le serveur devrait accepter cette requète 🤬

---

## Vie d'une requète dans notre serveur

- Notre serveur réponds a certaines combinaisons de verbes HTTP + path: **les routes**
- Les routes sont configurées dans le fichier `app.ts`
- A chaque route est associé un `Controller` qui **valide puis traduit** une requète HTTP vers de la logique métier
  - Les controlleurs se trouvent dans `./src/controller`
- Les controlleurs, pour persister les données peuvent utiliser aussi le `VehicleStore`, qui permets de manipuler les véhicles en base
  - Le store se trouve dans `./stc/store/vehicle.ts`

🎓 Exercice: Avec ces informations, pouvez vous isoler la ligne problèmatique dans notre code?

---

- `./src/controller/create.ts` L46 est problèmatique
- Ce qui fait que `validateRequestPayload` retourne une violation L16
- Et du coup le controller jette une instance de `AppError`
- La correction est facile à faire...
- ...mais essayons d'abord d'écrire un test qui prouve que la logique de validation fonctionne!
- ...comme ça le problème ne se reproduira plus!

---

## Contenu de notre test

- Ici note SUT est la seule méthode publique du `CreateVehicleController`, la méthode `handle`
- Notre test joue le scénario suivant
  - Sachant que j'ai une requète valide!
  - Lorsque j'appelle la méthode `handle` du `CreateVehicleController`
  - Alors la réponse doit avoir le contenu attendu. (resultat)
  - (et optionellement) on valide que CreateVehicleStore à été appellé (effet de bord)

---

## Problème: nous ne voulons pas intéragir avec la base de données!

- Le constructeur de `VehicleStore` necessite un `pg.Pool`, un pool de connections a la base de données.
- Dans le cas d'un test unitaire, nous n'avons pas d'infrastructure disponible.
- **Solution**: Utilisation d'un bouchon (**mock**) pour notre instance de la classe `VehicleStore`
  - Une **fausse** implémentation, pilotable par les tests, qui permets de nous affranchir de notre base de donnée

---

## Mise en place du test

Créez un fichier `./src/controller/create.test.ts` et ajoutez le contenu suivant.

```ts
{{< snippet src="snippets/ut-boilerplate.ts" tags="imports,mocks">}}
```

---

## Cycle de Vie d'un test

- Un test nécessite une phase de mise en place, et une phase de nettoyage
- Ces phases sont jouées soit avant / après chaque test `beforeEach`, `afterEach`
- ou en début / fin d'un bloc `describe`, via  `beforeAll`, `afterAll`
- **Motivation**: L'isolation des tests, pour éviter que un test est un effet sur un autre test de la même suite

---

Ajoutez le bloc suivant a la fin de votre fichier de test

```ts
{{< snippet src="snippets/ut-boilerplate.ts" tags="tests">}}
```

Vous pourez ensuite lancer `npm run test`

---

```bash
 PASS  src/controller/create.test.ts
  create vehicle controller
    ✓ creates valid vehicle (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.036 s
Ran all test suites.
```

---

## Implémentation du Test Unitaire

Il nous faut maintenant implémenter le corps du test

```ts
{{< snippet src="snippets/ut-boilerplate.ts" tags="testsbody">}}
```

Vous pouvez maintenant relancer `npm run test`

---

```bash
 FAIL  src/controller/create.test.ts
  create vehicle controller
    ✕ creates valid vehicle (2 ms)

  ● create vehicle controller › creates valid vehicle

    Invalid create vehicle request

      16 |     const violations = validateRequestPayload(req.body);
      17 |     if (violations.length > 0) {
    > 18 |       throw new AppError(
         |             ^
      19 |         ErrorCode.BadRequest,
      20 |         "Invalid create vehicle request",
      21 |         { violations: violations },

      at CreateVehicleController.handle (src/controller/create.ts:18:13)
      at Object.<anonymous> (src/controller/create.test.ts:70:26)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        2.748 s, estimated 3 s
```

La méthode handle à jeté une `AppError`! Notre test mets en évidence notre bug!

🎓 Exercice: Faites les changements nécessaires (dans le code métier) pour faire passer notre test au vert!

---

## 🎓 Exercice: Valider la réponse!

- Si l'on fait une requète correct, le controlleur écrit le status `200` dans la réponse
- Le controlleur écrit aussi le véhicule créé dans le chanp `json` dans la réponse, il faudrait le valider!
- 🎓 Complétez le test de façon à ce qu'il vérifie que le contenu répondu corresponde a la requète!
  - 💡Vous pouvez accéder au contenu via `resp.gotJson`
  - 💡Le mock donnera toujours l'ID `12` au nouveau véhicule
  - 💡Vous pouvez vous aider des assertions `jest` [doc](https://jestjs.io/docs/expect)
  - Pour vérifier: penser a faire échouer votre test (en changeant l'ID répondu par le mock par exemple);

---

## ✅ Solution: Valider la réponse!

```ts
expect(resp.gotJson).toEqual({
    vehicle: new Vehicle(
        12,
        'abac',
        17,
        {longitude: 45, latitude: 45},
    )
});
```

---

## 🎓 Exercice: Ecrire le cas négatif!

- Si l'on commente l'appel à la fonction validation, votre test continuera de passer!
- Du coup on aimerait avoir un autre test qui prouve que lorsqu'un shortcode trop court / long, une AppError est jetée avec le bon contenu!

---

- Quelques indications:
  - 💡Il faut appeler la methode dans un bloc `try` / `catch` pour capturer l'exception
  - 💡Il vous faut aussi valider que le type de l'exception est `AppError`, jest à une assertion pour ça
  - 💡Pour accéder au attributs d'une `AppError`, il vous faut convertir l'exception avec le mot clé `as`
    - `const myErr = err as AppError`
  - 💡La définition de `AppError` se trouve dans  `./src/errors.ts`
  - 💡Comment se comporte votre test si aucune erreur n'est jetée?

---

## ✅ Solution: Ecrire le cas négatif!

```ts
{{< snippet src="snippets/ut-boilerplate.ts" tags="tests,negativetestbody">}}
```

---

## Test Unitaire : Pro / Cons

- ✅ Super rapides (<1s) et légers a exécuter
- ✅ Pousse à avoir un bon design de code
- ✅ Efficaces pour tester des cas limites
- ❌ Environnement "aseptisé" et "bouchonné", défini par le développeur
- ❌ "Ossifie" le code

---

## Le périmètre testé est-il satisfaisant?

- La suite de tests qui vient de casser teste la logique de validation de la requête reçue.
- Est-ce que cela est suffisant pour prouver que la fonctionnalité "créer un véhicule" fonctionne ?

---

- Pas exactement, d'autres composants entrent en jeu dans l'environnement réel
  - La couche de communication avec la base de données, le routage HTTP...

---

{{< figure src="/images/ut-fail.gif" >}}

---

{{< figure src="/images/ut-fail-2.gif" >}}

---

{{< slide template="invert" >}}

Tester des composants indépendamment ne prouve pas que le système fonctionne une fois intégré!

---

## ✅ Solution: Tests d'intégration

- Test validant que l'assemblage de composants se comportent comme prévu.
- Teste votre application au travers de tous ses composants
- Par exemple avec vehicle-server:
  - Prouve que GET /vehicles retourne la liste des véhicules les plus proche d'un point donné
  - Prouve que POST /vehicles enregistre un nouveau véhicule en base.

---

## Définition du SUT

Une suite de tests d'intégration doit:

- Démarrer et provisionner un environnement d’exécution (une DB, Elasticsearch, un autre service...)
- Démarrer votre application
- Jouer un scénario de test
- Éteindre et nettoyer son environnement d’exécution pour garantir l'isolation des tests

➡️ On se place ici d'un point de vue du client de l'application

---

- ❌ Ce sont des tests plus lents et plus complexes que des tests unitaires.
- ⏳Tout tester avec des tests d'intégration n'est pas efficace
- ➡️ Il faut équilibrer les deux stratégies

---

On parle de "pyramide des tests"

{{< figure src="/images/pyramide-tests.png" >}}

{{% small %}}
Source [octo.com](https://blog.octo.com/la-pyramide-des-tests-par-la-pratique-1-5)
{{% /small %}}

---

## Anatomie de notre test d'intégration

Dans notre cas, pour réaliser un test d'intégration il va nous falloir

1. Démarrer notre serveur de base de données avant d'exécuter notre suite de tests
2. Provisionner notre schema avant chaque test
3. Démarer notre application
4. Envoyer une requête HTTP a notre serveur
5. Faire des vérifications sur la réponse obtenue (résultat)
6. Faire des vérificatiosns sur ce qu'on socke en base (effet de bord)
7. Détruire le schena a la fin du test
8. Eteindre le serveur de base de données a la fin de l'exécution de la suite de testts

---

Pour nous simplifier la tấche, on se propose d'utiliser les librairies suivantes:

- [ladjs/supertest](https://github.com/ladjs/supertest) abstrait le démarage, la configuration et l'envoi de requêtes HTTP a l'application charge
- [@testcontainers/postgres](https://testcontainers.com/modules/postgresql/?language=nodejs) qui permet en quelque lignes de démarer et d'arreter un serveur postgresql dans un container Docker.


🎓 Exercice: En suivant la documentation, installez ces dépendances!

---

## Mise en place de notre test d'intégration

```ts
{{< snippet src="snippets/it-boilerplate.ts" >}}
```

Essayez ensuite de lancer `npm run test`

---

## Nous avons un AUTRE BUG 😭😱

Lorsque l'on crée un véhicule...

```bash
curl \
    -H "Content-Type: application/json" \
    --data '{"shortcode":"abbccc", "battery": 12, "latitude": 53.43, "longitude": 43.43}' \
    localhost:8080/vehicles | jq
```

Le serveur intervertit la longitude et la latitude 🤦

```json
{
  "vehicle": {
    "id": 1,
    "shortcode": "abbccc",
    "battery": 12,
    "position": {
      "longitude": 53.43, // <- devrait etre 43.43
      "latitude": 43.43   // <- devrait etre 53.43
    }
}
```

---

Cela est aussi visible lorque qu'on liste les véhicules

```bash
curl localhost:8080/vehicles | jq .
```

```json
{
  "vehicles": [
    {
      "id": 1,
      "shortcode": "abbccc",
      "battery": 12,
      "position": {
        "longitude": 53.43, // <- devrait etre 43.43
        "latitude": 43.43   // <- devrait etre 53.43
      }
    }
  ]
}
```

- Cela proviens certainement d'un bout de code utilisé en commun entre le `ListVehiclesController` et le `CreateVehicleController`
- Nous n'avons rien vu lors de l'écriture des tests unitaires du `ListVehiclesController`
- 🎓 Exercice: Avec ces informations, pouvez vous trouver la / les lignes problèmatiques?

---



{{% /section %}}

