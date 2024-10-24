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


{{% /section %}}
