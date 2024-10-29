+++
weight = 70
+++

{{% section %}}

{{< slide template="invert" >}}

## Typescript

{{< figure src="/images/typescript.png" width="300" >}}

---

Le typage dynamique, cette fausse bonne idée!

```js
function printLength(item) {
  console.log("Length is", item.length);
}


printLength([1,2,3]);         // Ok!
printLength("coucou");        // Ok!
printLength({"name":"joel"}); // Ok... oh wait?
```

---

Toute une classe d'erreurs (stupides) de programation ne sont détectées qu'a l'exécution, alors qu'on pourrait les trouver bien plus tot!

---

Erreurs d'autant plus faciles à commettre...

{{< figure src="/images/javascript.webp" >}}

---

{{< figure src="/images/static_types.png" >}}

---

🤯🤯 🤯  Et si on rajoutait un système de typage statique sur Javascript 🤯 🤯 🤯

---

## Hello Typescript

- Langage Open Source dévelopé par Microsoft
- 1.0 en 2014, Actuellement en v5
- Rajoute des annotations optionelles de typage a Javascript
- Superset de Javascript (tout programme Javascript est valide en Typescript)

---

## Un premier programme Typescript

```ts
type User = {
  name: string;
  age: number;
};

function isAdult(user: User): boolean {
  return user.age;
}

const justine = {
  name: 'Justine',
  age: 27,
} satisfies User;

const isJustineAnAdult = isAdult(justine);
```

🎓 Exécutez ce programme avec `node`

---

```
type User = {
     ^^^^

SyntaxError: Unexpected identifier 'User'
    at wrapSafe (node:internal/modules/cjs/loader:1497:18)
    at Module._compile (node:internal/modules/cjs/loader:1519:20)
    at Object..js (node:internal/modules/cjs/loader:1709:10)
    at Module.load (node:internal/modules/cjs/loader:1315:32)
    at Function._load (node:internal/modules/cjs/loader:1125:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
```

---

## La """transpilation"""

- `node` exécute du Javascript, pas du Typescript
- Il faut convertir notre code Typescript en Javascript
- Pour cela on utilise la commande `tsc` (Typescript Compiler)

```bash
tsc ./index.ts
```

---

Visiblement le compilateur Typescript a trouvé quelque chose!

```
index.ts(7,3): error TS2322: Type 'number' is not assignable to type 'boolean'.
```

- 💀 C'est un souci de typage qui signifie une erreur de logique!
- Notre fonction `isAdult` devrait comparer l'age de la personne à un age seuil pour dire si elle est adulte ou non!

</br>

🎓 Notre programme à un souci, corrigez le!

---

## Types primitifs

`string`, `number`, `void` (rien) and `boolean`

```ts
let age :number = 10;
let age = 10; // Equivalent, tsc devine le type de la variable age en fonction de la valeur assignée!

const isFalse :boolean = false;

const name = "hello word";

age = name; // Type 'string' is not assignable to type 'number'.
```

---

## Collections

```ts
const ages :number[] = [2, 3, 4];
const ages = [2, 3, 4];                 // Equivalent
const ages :Array<number> = [2, 3, 4]; // Equivalent, utilise un type parametrique
```

---

## Any

`any` est un type spécial qui signifie tous les types. A éviter car on perds l'intérèt d'utilser typescript

```ts
let foo :any = 4;
foo = "string";
foo = {};
```

---

## Fonctions

On rajoute des annotations aux arguments et à la valeur de retour!

```ts
function sayHello(name: string, age: number): void {
  console.log(`Hello ${name}, you have ${age} years old`);
}

const sayArrow = (name :string, age :number): void => {
  console.log(`Arrow ${name}, you have `${age} years old");
};
```

Pour les fonctions anonymes, le type est deviné par le compilateur.

```ts
const numbers = [1, 2, 3, 4];

numbers.forEach((v) => console.log(v.length)); // Property 'length' does not exist on type 'number'
```

---

## Objets

```ts
function sayHello(user: { name: string, age: number}): void {
    console.log(`Hello ${user.name}, your age is ${user.age}`);
}

type User = {
  name: string;
  age: number;
};

function sayHelloClean(user :User): void {
    console.log(`Hello ${user.name}, your age is ${user.age}`);
}
```

---

## Définir ses Propres Types

Deux façons plus ou moins équivalentes: **alias de types** ou **interfaces**

```ts
// Déclare le type user qui est un objet deux attributs (name et age).
type User = {
  name: string;
  age: number;
};

// Déclare l'interface User2 qui représente l'ensemble des objets ayants au moins l'attribut name et age.
interface User2 {
  name: string;
  age: number;
}

function sayHello(user: User) {
  //...
}

function sayHello2(user: User2) {
  // ...
}

const myUser = {name: "John", age: 40};
const myCar = {name: "Bernadette2", age: 4, brand: "McLaren" };

sayHello(myUser); // OK!
sayHello2(myUser); // OK!
sayHello(myCar); // OK!
sayHello2(myCar); // OK!
```

---

## Attributs Optionels

```ts
type User = {
  name: string;
  age: number;
  haircut?: string; // Haircut peut etre soit une string, soit undefined
};

const user :User = {name: "foo", age: 12};

console.log(user.haircut);

user.haircut = "banana"

console.log(user.haircut);
```


---

## Types Paramétriques

Permets de définir un type en fonciton d'un autre.

```ts
// Définit une interface Container de quelque chose (type T).
interface Container<T> {
  content: T;
}

let intContainer :Container<number> = {content: 4};
let stringContainer :Container<string> = {content: "foooo"};

//Exemple concret: Arrays!

const myArray :Array<number> = ["foo", "bar", "biz];
```

---

## Unions

```ts
type NumberOrString = number | string;
type StringOrNullOrUndefined = string | null | undefined;

type User = {
  name: string;
  age: number;
  haircut: StringOrNullOrUndefined; // Haircut peut etre soit une string, soit undefined
};
```

---

## 🎓 Exercice: Corrigez le code suivant

Corrigez le code suivant de façon à ce que `tsc` passe... (sans toucher au corps de la fonction startCar)

```ts
type Car = unknown;

function startCar(car: any) {
  console.log(`Cheking the wheels ${car.wheels.length}`);
  console.log(`Starting the car ${car.brand}`);
}
```

---

## ✅ Solution: Corrigez le code suivant

```ts
type Wheel = {};

type Car = {
  brand: string;
  wheels: Array<Wheel>;
};

function startCar(car: Car) {
  console.log(`Cheking the wheels ${car.wheels.length}`);
  console.log(`Starting the car ${car.brand}`);
}
```

---

## Checkpoint 🎯

- Nous avons vu comment utiliser Typescript
- Nous avons vu rapidement quelques primitives de bases du langage
  - Types primitifs et annotations
  - Objets
  - Définition de types, unions et types generiques

- Pour aller plus loin c'est par [ici](https://www.typescriptlang.org/docs/handbook/intro.html)!




{{% /section %}}

