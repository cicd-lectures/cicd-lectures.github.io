+++
weight = 70
+++

{{% section %}}

{{< slide template="invert" >}}

## Javascript et NodeJS

{{< figure src="/images/JavaScript-logo.png" width="300" >}}
{{< figure src="/images/nodejs.png" width="300" >}}

---

## Javascript

- Langage interprété, syntaxe proche du C
- Dynamique (types des variables assigné // deviné á l'exécution)
- Gestion de la mémoire automatisée (avec un Garbage Collector)
- Fonctions pouvant etre manipulées comme des variables
- Supporte différents styles de programation (impératif, OO ou fonctionnel)
- Pensé pour la concurence

---

- Standardisé par l'**European Computer Manufacturers Association** (ECMA)
  - Avec la spécification [ECMA-262](https://tc39.es/ecma262/) réévaluée tous les ans depuis 2015.
- Langage de script initialement conçu pour rendre interactives des pages web (AJAX)
- Maintenant aussi utilisé coté serveur!

---

## Ou s'exécute le code Javascript?

Nous avons besoin d'un interpréteur pour exécuter notre code Javascript

- 🖥️ **Coté navigateur**:
  - V8 (Chrome et dérivés...)
  - SpiderMonkey (Firefox)
- 💽 **Coté serveur**:
  - NodeJS: Un environnement d'exécution Javascript
  - D'autres alternatives existent ([deno](https://deno.com/), [bun](https://bun.sh/)...)

---

## NodeJS? Kézako?

- Environement d'exécution Javascript libre et multi platforme 
- Basé sur V8
- Possède une vaste librairie standard
- Optimisé pour les opérations asyncrhones
- Actuellement en version 23

---

## 🎓 Exercice : Un premier programme NodeJS

- Dans le répertoire `workspace` créez un répertoire `helloworld`
- Dans ce répertoire, créez un fichier `index.js` avec le contenu suivant

```js
console.info("Hello World");
```

- Exécutez votre programme a l'aide de la commade `node ./index.js`
- Que se passe t'il?


---

## ✅ Solution : Un premier programme NodeJS

```bash
# Crée un répertoire helloworld
mkdir -p /workspace/helloworld
# Saute dans le répertoire
cd /workspace/helloworld
# Crée un fichier index.js avec notre programme
echo 'console.info("Hello world");' > index.js
# Exécute notre programme
node ./index.js
```

Ce programme affiche sur sa sortie standard le message "Hello World"

---

- NodeJS peut exécuter un programme: `node ./monprograme.js`
- Ou alors s'exécuter en mode REPL: `node`
  - 💡 Très utile pour expérimenter... ou s'en servir de calculatrice :D

</br>
</br>

🎓  Quel est le résultat de l'opération `((38 + 44) / 12) - 1`

---

## Un programme un peu plus complexe

Voici maintenant un programme qui résouds le nom de domaine `voi.com` vers une adresse IP en utilisant DNS

```js
import dns from 'node:dns';

dns.resolve('voi.com', (err, records) => {
    console.log(records, err);
});
```

- 🎓 Quelle sont les adresses IP du site voi.com?
- 🎓 (bonus) et les addresses IPv6? [doc](https://nodejs.org/docs/latest-v23.x/api/dns.html#dnsresolve6hostname-options-callback)

---

## Analysons ligne par ligne

- `import 'dns'`: Importe le module `dns` de la librairie standard node
- `dns.resolve`: Appelle la fonction `resolve` du module DNS en passant deux arguments.
  - Une chaine de caractères 'voi.com'
  - Une fonction anonyme qui accepte deux arguments (err, records) et qui affiche la liste d'adresses

---

## Types en Javacript

Javascript est un langage faiblement typé

```js
let foo = 42; // foo is now a number
foo = "bar"; // foo is now a string
foo = true; // foo is now a boolean
```

---

## Types primitifs

- `Boolean`: true ou false
- `Number`: Valeur numérique stockée sur 64 bits (regroupe integer ET float)
- `String`: Chaine de caractères (UTF-16)
- `Null`: absence d'un object, une seule valeur possible `null`
- `Undefined`: absence de valeur, une seule valeur possible `undefined`

D'autres types existent ... `Bigint`, `Symbol`...

---

## `null` vs `undefined`


- `undefined` signifie qu'une variable a été déclarée mais n'a pas reçu de valeur.
- `null` signifie l'absence d'objet

```js
let foo;
console.log("FOO", foo) // <- undefined

let bar = null;
console.log("BAR", null) // <- null
```

---

## Variables en Javascript

- Une variable est une zone mémoire dans laquelle on peut écrire ou lire une valeur
- Il existe trois mots clés pour déclarer des variables
  - **let**: Déclare une variable réassignable
  - **const**: Déclare une variable non réassignable (en lecture seule)
  - **var**: Déclare une variable réassignable
    - Maintenue dans la spec pour rétrocompatibilité, mais il est recommandé de ne plus l'utiliser

---

## Différence entre const et let

```js
let foo = 4;
const bar = 12;


foo = 56;
bar = 67;
```

🎓  Le script suivant s'exécute t'il?

---

## Différences entre `var` et `let`/`const`

Une variable déclarée avec `let` / `const` n'est utilisable que si elle est déclarée préalablement.

```js
function good() {
    count = 12; // ReferenceError: Cannot access 'count' before initialization

    let count = 0;
}


function bad() {
    badCount = 42; // Valid, because of some reordering happening when node interprets the code.

    var badCount = 12;
}

bad();
good();
```

---

La portée d'une variable déclarée avec `let` ou `const` est facilement prédictible

```js
var bad = 12;
let good = 42;

if (true) {
  var bad = 56;
  let good = 12;
}

console.log(bad, good)
```

🎓 Qu'affiche le script suivant?

---

[var est une source incroyable de problèmes](https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/)

---

## Variables en Javascript: bonnes pratiques

- 💀 On n'utilise pas `var`.
- ✅ Si notre variable n'est pas réécrite, on utilise `const`
- ✅ Sinon, on utilise `let`.

---

## Déclaration de Block

- Tout ce qui est entre accolade est un `block`.
- La portée des variables déclarées avec `const` et `let` est le "block"

```js
{ // block anonyme
  const maVariable = 12;

};

console.log(maVariable);
```

🎓 Le script suivant s'exécute t'il?

---

## Controle de flot

```js
// if / else
if (condition1) {
  statement1;
} else {
  statement2;
}

// switch case
const name = "julien"
switch (name) {
  case "michel":
     //...
  case "julien":
    console.log("bonjour");
  default:
    // ...
}
```

---

## Conditions

Toute expression qui évalue vers une valeur booleenne

```js
a == b // égalité
a === b // égalité stricte
a >= b // comparaisons

❌ a = b // Pas une condition, un assignement!
```

---

## Egalité vs Egalité stricte

- ❌ `a == b` egalité, tente de faire des conversion de types implicites
- ✅ `a === b` égalité stricte, ne fait pas de conversions implicites

```js
let a = 2;
let b = '2';

a == b; // true
a === b; // false, a est du type number, b est du type string
```

---

## Boucles

```js
for (let step = 0; step < 5; step++) {
  // Runs 5 times, with values of step 0 through 4.
  console.log("Walking east one step");
}
```

Il y à plein d'autres formes de boucles [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration).

---

## Fonctions

- Une fonction est un groupement logique d'instructions
- Accepte des arguments et peut retourner un résultat

```js
function sayHello(name) {
  console.log("Hello", name);
}
```

---

Passage des arguments par valeur (on fait une copie)


```js
function passageParValeur(count) {
  count = 56;
}

let value = 45;

passageParValeur(value);

console.log(value); // <- Affiche 45
```

---

...sauf dans le cas des objets!


```js
func makeItAHonda(car) {
  car.brand = "honda";
}

const car = {
  brand: "renault",
  seats: 4
};

console.log("brand is", car.brand); // Affiche renault

makeItAHonda(car);

console.log("brand is", car.brand); // Affiche honda!
```

---

Les fonctions peuvent etre manipulées comme des valeurs

```js
function otherFunction(callback) {
  // do something...
  const result := getResult();
  callback(result);
}

const myCallback = function(result) {
  console.log("Result is", result);
}

otherFunction(myCallback);
```

---

Une fonction à accès aux variables déclarées dans le scope parent.

```js
function sum(a) {
  const word = "coucou";

  return function(b) {
    console.log(word);
    return a + b;
  };
}

console.log(sum(3)(4));
```

Cela s'appelle une **closure**

---

## Arrow Functions

Syntaxe allégée pour déclarer et implémenter une fonction.

```js
function otherFunction(callback) {
  // do something...
  const result := getResult();
  callback(result);
}


const myCallback = (result) => {
  console.log(result);
};

otherFunction(myCallback);
otherFunction((result) => console.log(result));
```

---

## Collections

On distigue deux types:

- Les collections indexées: **tableaux**
- Les collections clés valeur: **les maps**

---

```js
const arr = [1, 2, 3, 4];
const arr1 = new Array(1, 2, 3, 4); // équivalent
const arr2 = Array(1, 2, 3, 4);     // équivalent

// Accès par index
console.log(arr[2]);

// Itération
for (v of arr) {
  console.log(v);
}

arr.forEach((v) => console.log(v));
```

---

### 🎓 Exercice: Trouvez la valeur la plus grande dans un tableau;

Soit le tableau suivant:

```js
const arr = [18, 4, 99, 1203, 5, 3, 5566, 22, 12];
```

- Écrivez une fonction qui permet de trouver la valeur la plus grande d'un tableau
- Bonus, faites le en une seule ligne (👀 [Indice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) et [Indice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator))

---

### ✅ Solution: Trouvez la valeur la plus grande dans un tableau

```js
function findMax(arr) {
  let max = 0;

  for value of arr {
    if value > max {
      max = value;
    }
  }

  return max;
}

// Ou encore...
function findMaxH4ckZ0r(arr) {
  return arr.reduce((max, v) => v > max ? v : max)
}
```

💭 Quelle version préférez vous?

---

## Objets

Un objet est une collection d'attributs.

On peut créer un objet avec une expression litterale

```js
const myCar = {
  brand: "Renault",
  wheels: 3,
  year: 1997
}
```

---

Ou encore avec un constructeur

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const myCar = new Car("renault", 3, 1997);
```

---

Accéder aux propriétés d'un objet

```js
const myCar = {
  brand: "Renault",
  wheels: 3,
  year: 1997
}


// Dot notation
console.log("La marque est", myCar.brand);

// Bracket notation
console.log("La marque est", myCar["brand"]);

// Les attributs non définis ont la valeur `undefined`
console.log(myCar.wings) // undefined
```
---

## Classes

- Depuis ES6 (2015), Javascript supporte l'idée de `classe`, comme d'autres langages orientés objet
- Une classe c'est:
  - Une définition de type
  - Qui comporte un état (une collection d'attributs)
  - Et des méthodes (des fonctions attachées a ce type)

---

```js
class Car {
  // Attributs privés
  #brand = "";
  #wheels = 0;
  #year = 0;

  // Constructeur
  constructor(brand, wheels, year) {
    this.#brand = brand
    this.#wheels = wheels
    this.#year = year
  }

  // Accesseur
  get wheels() {
    return this.#wheels
  }

  // Methode
  isOperational() {
    return this.#wheels === 4;
  }
}
```

---

On crée une nouvelle instance d'une classe, un objet, avec `new`

```js
const myCar = new Car("Renault", 3, 1998);

if (myCar.isOperational()) {
  console.log("I can drive my car");
} else {
  console.log("I can't drive my car");
}

myCar.#wheels // Jette une erreur!
myCar.wheels // Utilise l'accesseur!
```

---

## Gestion d'erreur

Javascript représente une erreur a l'aide d'exceptions:
- On "jette" une exception a l'aide de l'instruction `throw`
- On "attrape" une exception avec des instructions `try..catch..finally`

```js
function doSomethingButFails() {
  throw "oops something went wrong";
}


try {
  doSomethingButFails();
} catch (e) {
  console.error("Could not do something", e);
} finally {
  console.info("Show must go on! Let's proceed anyway!");
}
```

---

## 🎓 Exercice: Votre Premier Serveur HTTP avec Node

- Ecrivez un script js qui lance un serveur HTTP de façon a ce que la commande `curl` suivante reçoive en réponse

```js
curl "localhost:3000?name=julien"

Hello julien
```

- Il faut se servir de la fonction `createServer` module HTTP de node [doc](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener)
- Ne pas oublier de démarer le serveur en appelant `listen` [doc](https://nodejs.org/api/net.html#serverlisten)
- Pour extraire le paramètre de requète name il vous faut
  - Parser l'URL de la requète aver `const reqUrl = new URL("http://localhost"+req.url)`
  - Et ensuite accéder au paramètre avec `reqUrl.searchParams.get("name")`

---

## ✅ Solution: Votre Premier Serveur HTTP avec Node

```js
import http from "node:http";
import { URL } from "node:url";

const srv = http.createServer((req, res) => {
  const reqUrl = new URL("http://localhost"+req.url);
  res.statusCode = 200;
  res.end("Hello " + reqUrl.searchParams.get("name")+"\n");
});

srv.listen(3000, "localhost", () => {
  console.log("Serving requests...");
});
```

---

## Modules Javascript

- En js, un fichier est égal a un module
- Deux standards existent
  - `CommonJS`: Venant de l'ecosystème NodeJS
  - `MJS`: Standardisé par ECMA

---

## Modules Javascript MJS

```js
// moduleA.js
class Car {
  // etc...
}
const message = "Hello, from Module A!";

export default message;
export Car;
```

```js
// moduleB.js
import messageA, { Car } from "./moduleA";

console.log(messageA);
const myCar = new Car()
```

---

## 🎓 Exercice: Déplacez votre serveur HTTP dans un module

1. Groupez la logique de votre serveur dans une fonction dédée
2. Déplacez cette fonction dans un nouveau module JS (nouveau fichier) qui export cette fonction.
3. Importez votre module dans votre script index.js

---

## ✅ Solution: Déplacez votre serveur HTTP dans un module

```js
// server.js
import http from "node:http";
import { URL } from "node:url";

export function runServer() {
  const srv = http.createServer((req, res) => {
    const reqUrl = new URL("http://localhost"+req.url);
    res.statusCode = 200;
    res.end("Hello " + reqUrl.searchParams.get("name")+"\n");
  });

  srv.listen(3000, "localhost", () => {
    console.log("Serving requests...");
  });
}
```

```js
// index.js
import { runServer } from "./server.js";

runServer();
```

---

## Javascript Asynchrone

- Ajouez une ligne de log immédiatement après l'appel a votre fonction qui execute le serveur
- Est-ce que cette ligne sera affichée après `Serving requests...` ou avant?

```js
// index.js
import { runServer } from "./server.js";

runServer();
console.log("Done with index.js");
```

---

- `Done with index.js` est affichée avant!
- Pourquoi?
  - `Server.listen` est une opération **asyncrhone**
  - Cette opération crée un socket et écoute dessus, cela utilise un (ou plusieurs) appels système bloquants
    - **Problème** : `nodejs` n'utilise qu'un seul processus, si l'on effectue une opération bloquante de façon synchrone, le reste de notre application ne pourra plus s'exécuter pendant la durée de cette opération!
    - **Solution**: `nodejs` ne bloque pas sur les appels systèmes, mais enregistre le fait qu'il faut appeler une fonction dite **callback** passée en argument quand l'opération bloquante est terminée!

---

Différents styles de programation asynchrone:

- 🔴 **Callbacks**: on passe une ou plusieurs fonction appelées quand l'opération bloquante est terminée
  - Simple, mais cela mène rapidement a du code 🍝
- 🟡 **Promesses**: une fonction bloquante retourne une `promesse`.
- 🟢 **Async/Await**: On cache une promesse derrère des mots clefs du langage.

---

## Promesses

Objet qui représente la complétion our l'echec d'une opération asynchrone.

```js
// promesse qui résouds après 500ms!
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello ENSG");
  , 500)
});

promise
  // On chaine un premier "handler" qui traite le resultat de la promesse et retourne une autre valeur
  .then((result) => {
    console.log("Result is", result);
    return result.length
  })
  // On chaine un second "handler" qui traite le resultat de la promesse précédente
  .then((length) => {
    console.log("length is", length)
  })
  // On chaine un "handler" d'erreur qui traite le cas ou notre promesse échoue
  .catch((err) => {
    console.error(err);
  });
```

---

## 🎓 Exercice: Utilisation de l'API `fetch`

Fetch est une API native de Javascript qui permets de récupérer une resource en effectuant une requète HTTP [doc](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)

<br/>

- Ecrivez un script JS qui affiche la population de Tatooine en récupérant avec `fetch` le contenu à l'URL suivante

```
https://swapi.dev/api/planets/1
```

- 💡 Pour parser en JSON le contenu de la réponse HTTP, il faut utiliser la méthode [json de la réponse](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)... qui retourne une promesse!
- 💡 Il est possible de voir un aperçu de la réponse JSON [ici](https://swapi.dev/api/planets/1)

---

## ✅ Solution: Utilisation de l'API `fetch`

```js
//index.js

fetch("https://swapi.dev/api/planets/1")
  .then((resp) => resp.json())
  .then((planet) => {
    console.log("planet population is ", planet.population);
  });
```

---

Bon c'est toujours un peu 🍝🍝🍝🍝🍝🍝

---

## Async / Await

- ECMASript 2017 introduit les fonctions asynchones: fonction déclarée avec le mot clé `async`
- Une fonction asyncrhone peut porter une ou plusieurs instructions `await` qui attendent la résolution d'une promesse.

```js
async function doStuff() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello ENSG"), 500);
  })

  const result = await promise;

  console.log("Result is", result)
  console.log("Length is", result.length)
}

doStuff();
```

---

## 🎓 Exercice: `fetch` avec Async / Await

Réécrivez votre programme qui donne la population de tatooine en utilisant Async / Await

---

## ✅ Exercice: `fetch` avec Async / Await

```js
async function fetchTatooinePopulation() {
  const response = await fetch("https://swapi.dev/api/planets/1");
  const planet = await response.json();

  console.log("planet population is", planet.population);
}

fetchTatooinePopulation();
```

---

## Checkpoint 🎯

- Nous avons revu les primitives de bases de JS
- Les modules
- Les opérations asynchrones
- Javascript est un langage qui semble seulement facile d'accès...
- ... [mais qui amène son lot de subtilités!](https://www.destroyallsoftware.com/talks/wat)

---

## Références

- [MDN Javascript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)
- [Node JS documentation](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

{{% /section %}}
