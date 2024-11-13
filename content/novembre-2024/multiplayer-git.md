+++
weight = 130
+++

{{% section %}}

{{< slide template="invert" >}}

## Git à plusieurs

---

## Limites de travailler seul

- Capacité finie de travail
- Victime de propres biais
- On ne sait pas tout

---

{{< figure src="/images/solo.gif" width=500 >}}

---

## Travailler en équipe ? Une si bonne idée ?

* ... Mais il faut communiquer ?
* ... Mais tout le monde n'a pas les mêmes compétences ?
* ... Mais tout le monde y code pas pareil ?

---

Collaborer c'est pas évident, mais il existe des outils et des méthodes pour vous aider.

---

## Git Multijoueur

- Git permet de collaborer assez aisément
- Chaque développeur crée et publie des commits...
- ... et rapatrie ceux de de ses camarades !
- C'est un outil très flexible... chacun peut faire ce qu'il lui semble bon !

---

## ... et (souvent) ça finit comme ça !

{{< figure src="/images/bloing.jpeg" >}}

---

## Comment eviter cette situation?

- La clé est de vous mettre d'accord sur des règles de fonctionnement avec votre équipe!
- En ce qui concerne l'utilisation de Git on parle de définir un **Git Flow**

</br>
</br>
En voici un exemple

---

## Gestion des Branches

- Les "versions" du logiciel sont maintenues sur plusieurs branches principales (main, staging)
- Ces branches reflètent l'état du logiciel
  - **main**: version actuelle en production
  - **staging**: prochaine version

---

{{< figure src="/images/gitmulti1.svg" >}}

---

- Chaque groupe de travail (développeur, binôme...)
  - Crée une branche de travail à partir de la branche staging
  - Une branche de travail correspond à *une chose à la fois*
  - Pousse des commits dessus qui implémentent le changement

---

{{< figure src="/images/gitmulti2.svg" >}}

---

{{< figure src="/images/gitmulti3.svg" >}}

Quand le travail est fini, la branche de travail est "mergée" dans staging

---

{{< figure src="/images/gitmulti4.svg" width=500 >}}

Quand on souhaite faire une nouvelle version du logiciel. On merge `staging` dans `main`, et l'on crée un tag sur le commit de merge

---

## Qu'est ce qu'un tag?

- Merger `staging` dans `main` est un évenement important qui doit figurer dans l'historique de notre code
- Un identifiant de commit est de granularité trop faible pour être utilisable.
* Utilisation de *tags* git pour définir des versions.
* Un *tag* git est une référence sur un commit, attachant un label à un commit spécifique

```
git tag 1.0.0 -a -m "Première release 1.0.0"
```

---

## Gestion des remotes

Où sont stockées ces branches ?

---

## Plusieurs modèles possibles

- Un remote pour les gouverner tous !
- Chacun son propre remote (et les commits seront bien gardés)
- ... toute autre solution est bonne,
  - ...du moment que toute votre équipe l'utilise!

---

## Un remote pour les gouverner tous

Tous les développeurs envoient leur commits et branches sur le même remote

- Simple a gérer ...
- ... mais nécessite que tous les contributeurs aient accès au dépôt
  - Adapté a l'entreprise, peu adapté au monde de l'open source

---

{{< figure src="/images/remotemulti1.svg" >}}

---

## Chacun son propre remote

- La motivation: **le contrôle d'accès**
  - Tout le monde peut lire le dépôt principal. Personne ne peut écrire dessus.
  - Tout le monde peut dupliquer le dépôt public et écrire sur sa copie.
  - Toute modification du dépôt principal passe par une procédure de revue.
  - Si la revue est validée, alors la branche est "mergée" dans la branche cible

- C'est le modèle poussé par GitHub !

---

{{< figure src="/images/remotemulti2.svg" width=800 >}}

---

## Forks ! Forks everywhere !

Dans la terminologie GitHub:

- Un fork est un remote copié d'un dépôt principal
  - C'est la où les contributeurs poussent leur branche de travail.
  - Les branches de version (main, staging...) vivent sur le dépôt principal
  - La procédure de ramener un changement d'un fork à un dépôt principal s'appelle la Pull Request (PR)

---

## 🎓 Exercice : Créez un fork

- Nous allons vous faire forker vos dépôts respectifs
- Trouvez vous un binôme dans le groupe.
- Rendez vous [sur cette page](https://docs.google.com/spreadsheets/d/1R1vcMQxJqAnzkSPcO0_iOtz_ICwTLDqBlUMcCyc2TWM/edit?usp=sharing) pour inscrire votre binôme.
- Depuis la page du dépôt de votre binôme, cliquez en haut à droite sur le bouton **Fork**.

{{< figure src="/images/fork.png" >}}

---

{{< slide template="invert" >}}

A vous de jouer: Corrigez la fonctionnalité "suppression d'un véhicule" dans projet de votre binôme

---

## 🎓 Exercice : Contribuez au projet de votre binôme (1/4)

Première étape:

1. On clone le fork dans son environnement de développement
2. On crée une branche de développement

```bash
cd /workspace/

# Clonez votre fork
git clone <url_de_votre_fork>

# Créez votre feature branch
git switch --create fix-delete
# Équivalent de git checkout -b <...>
```
---

## 🎓 Exercice : Contribuez au projet de votre binôme (2/4)

- Extraire l'identifiant (la valeur `id`) du path en utilisant `req.params`.
- Parser la valeur obtenue en `number` en utilisant `parseInt`
- Appeler la méthode `deleteVehicle` du `VehicleStore` en passant l'identifiant.
  - ⚠️ C'est une méthode asynchrone!
- Enfin il faut faire une réponse:
  - Si la suppression est réussie, répondre un status code 204 en appelant `res.status(xxx).send()`,

N'oubliez pas de tester votre changements en utilisant les exemples du fichier README!

---

## 🎓 Exercice : Contribuez au projet de votre binôme (3/4)

Une fois que vous êtes satisfaits de votre changement il vous faut maintenant créer un commit et pousser votre nouvelle branche sur votre fork.

---

## 🎓 Exercice : Contribuez au projet de votre binôme (4/4)

Dernière étape: ouvrir une pull request!

- Rendez vous sur la page de votre projet
- Sélectionnez votre branche dans le menu déroulant "branches"  en haut a gauche.
- Cliquez ensuite sur le bouton ouvrir une pull request
- Remplissez le contenu de votre PR (titre, description, labels) et validez.

{{< figure src="/images/pr.png" >}}

---

## La procédure de Pull Request

**Objectif** : Valider les changements d'un contributeur

- Technique : est-ce que ça marche ? Est-ce maintenable ?
- Fonctionnel : est-ce que le code fait ce que l'on veux ?
- Humain : Propager la connaissance par la revue de code.
- Méthode : Tracer les changements.

---

## Revue de code ?

- Validation par un ou plusieurs pairs (technique et non technique) des changements
- Relecture depuis github (ou depuis le poste du développeur)
- Chaque relecteur émet des commentaires // suggestions de changement
- Quand un relecteur est satisfait d'un changement, il l'approuve

---

- La revue de code est un **exercice difficile** et **potentiellement frustrant** pour les deux parties.
  - Comme sur Twitter, on est bien à l'abri derrière son écran
- En tant que contributeur, **soyez respectueux** de vos relecteurs : votre changement peut être refusé et c'est quelque chose de normal.
- En tant que relecteur, **soyez respectueux** du travail effectué, même si celui ci comporte des erreurs ou ne correspond pas à vos attentes.

💡 Astuce:[Proposez des solutions](https://github.com/franckverrot/clamav-client/pull/12#discussion_r526222319) plutôt que simplement pointer les problèmes.

---

## 🎓 Exercice : Relisez votre PR reçue !

- Vous devriez avoir reçu une PR de votre binôme
- Relisez le changement de la PR
- Effectuez quelques commentaires (bonus: utilisez la suggestion de changements), si c'est nécessaire
- Si elle vous convient, approuvez la!
- En revanche ne la "mergez" pas, car il manque quelque chose...

---

## Validation automatisée

**Objectif**: Valider que le changement n'introduit pas de régressions dans le projet

- A chaque fois qu'un nouveau commit est créé dans une PR, une succession de validations ("checks") sont déclenchés par GitHub
- Effectue des vérifications automatisées sur un commit de merge entre votre branche cible et la branche de PR

---

## Quelques exemples

- Analyse syntaxique du code (lint), pour détecter les erreurs potentielles ou les violations du guide de style
- Compilation du projet
- Exécution des tests automatisés du projet
- Déploiement du projet dans un environnement de test...

Ces "checks" peuvent êtres exécutés par votre moteur de CI ou des outils externes.

---

## 🎓 Exercice : Déclencher un Workflow de CI sur une PR

- Votre PR n'a pas déclenché le workflow de CI de votre binôme 🤔
- Il faut changer la configuration de votre workflow pour qu'il se déclenche aussi sur une PR
- Vous pouvez changer la configuration du workflow directement dans votre PR
- La [documentation](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows) se trouve par ici
- Quand vous poussez votre changement, vous devriez voir votre workflow `CI` s'exécuter!

---

## ✅ Exercice : Déclencher un Workflow de CI sur une PR

```yaml
{{< snippet src="snippets/vehicle-server.yml" tags="pr">}}
```

---

## 🎯 Checkpoint

Nous avons vu:

- Un exemple de modèle de gestion de branches git
- Plusieurs modèles de gestions de remotes
- Ce qu'est un "fork" sur GitHub
- Le processus pour effectuer une contribution en utilisant un projet forké!

<br/>

- ➡️ Nous allons maintenant améliorer notre CI en ajoutant de l'analyse statique et des tests!
- ➡️ Vous pouvez merger la PR reçue et supprimer le répertoire du fork dans votre workspace Gitpod

{{% /section %}}
