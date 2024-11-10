+++
weight = 140
+++

{{% section %}}

{{< slide template="invert" >}}

## Analyse Statique de Code

(lint)

---

## Pourquoi faire de l'analyse statique?

- **Objectif**: améliorer les capacités de notre CI à détecter des problèmes
  - Plus on détecte des problèmes tôt, moins ils seront couteux!
- Un `linter` est un programme qui parcours une base de code à la recherche d'erreurs sans exécuter le programme
- Ces outils permettent de détecter de nombreuses erreurs de types variés
- Ils permettent de garantir aussi une utilisation uniforme du langage dans une base de code

---

Par exemple

- Appel d'une fonction asynchrone sans utiliser await
- Une assignation ou une lecture de variable non typée
- Problèmes d'indentation
- Risque d'injection SQL ou d'exécution arbitraire de commandes
- Utilisation de "nombres magiques"...

---

## Comparaison avec Typescript

```ts
function sayName(value: any) {
  console.log(value.name);
}
```

- Cet exemple de code est valide pour le compilateur Typescript
- Il est en revanche **dangereux**, aucune vérification n'est faite pour prouver que value à un attribut `name`
- Ce n'est pas parce que le code est correct d'un point de vue typage qu'il est forcément juste!
    - Il n'y à pas de *ça compile alors ça marche*

---

## Typescript + Lint = ❤️

- Typescript nous permets d'annoter notre code avec des informations supplémentaires sur le type de variables
- Cet ajout d'information permets aux analyseurs de code d'affiner leurs vérifications
- Ce sont deux outils parfaitement complémentaires!

---

## ESLint

[https://eslint.org](https://eslint.org/)

- Le linter prédominant de la communauté Javascript
- Construit autour de l'idée de **règles**
- Une **règle** vérifie qu'un bout de code valide une certaine attente, et indique comment le corriger
- ESLint embarque des [centaines de règles par défaut](https://eslint.org/docs/latest/rules)
- Mais est aussi facilement extensible à l'aide de plugins

---

## typescript-eslint

- ESLint n'est conçu que pour travailler avec Javascript
- Fort heureusement le projet [typescript-eslint](https://typescript-eslint.io) étends les capacités d'eslint pour qu'il puisse supporter Typescript!
- Il arrive avec un parseur typescript et aussi un [lot de règles groupés par presets](https://typescript-eslint.io/rules/) pour valider du code TS

---

## 🎓 Exercice : Mettez en place typescript-eslint dans votre projet

Dans une nouvelle branche, à jour de `main`, de votre dépot `vehicle-server`

- Mettez en place `typescript-eslint` en suivant le [guide de mise en place](https://typescript-eslint.io/getting-started/)
- On souhaite activer les presets `strict` et `stylistic`
- On souhaite aussi que `npm run lint` excécute l'analyse statique sur la base de code typescript!
- Corrigez éventuellement les erreurs et warnings rapportées
  - 💡eslint peut corriger certaines erreurs automatiquement!

---

## ✅ Solution : Mettez en place typescript-eslint dans votre projet

1. On ajoute les dépendances de développement au package npm du projet

```bash
npm install --save-dev eslint @eslint/js @types/eslint__js typescript-eslint
```

2. On ajoute la configuration typescript-eslint

```js
// ./eslint.config.mjs
// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
```

---

3. On ajoute un script lint au fichier package.json

```json
{
...
  "scripts":{
    // ...
    "lint": "eslint ./src"
  }
}
```

4. On lance le lint et on applique la correction automatique

```bash
npx eslint --fix ./src
npm run lint
```

---

## 🎓 Exercice : Ouvrez une PR qui rajoute l'excécution du lint à votre workflow de CI

Nous voulons maintenant que le workflow de CI excécute le lint après la compilation

---

## ✅ Solution : Ouvrez une PR qui rajoute l'excécution du lint à votre workflow de CI

1. On crée un commit rajoutant les outils de lint et leur configuration
2. On rajoute un autre commit qui rajoute un `step` executant `npm run lint` dans le workflow de CI
3. On ouvre une PR avec ces changements

---

```yaml
{{< snippet src="snippets/vehicle-server.yml" tags="pr,lint">}}
```

---

## 🎯 Checkpoint

Nous avons vu:

- L'analyse statique est un outil complémentaire au typage statique
- Cela permet de détecter des problèmes et d'assurer une bonne utilisation du langage
- Nous avons mis en place ESLint + typescript-eslint
- Et notre workflow vérifie que notre base de code respecte toutes les règles de lint!
- ➡️ Si le CI est vert, vous pouvez merger votre PR!





{{% /section %}}


