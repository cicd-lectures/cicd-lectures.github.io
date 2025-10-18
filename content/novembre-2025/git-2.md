+++
weight = 110
+++

{{% section %}}

{{< slide template="invert" >}}

## Mettre son code en sécurité

---

## Une autre petite histoire

Votre dépôt est actuellement sur votre ordinateur.

- Que se passe t'il si :
  - Votre disque dur tombe en panne ?
  - On vous vole votre ordinateur ?
  - Vous échappez votre tasse de thé / café sur votre ordinateur ?
  - Une météorite tombe sur votre bureau et fracasse votre ordinateur ?

---

{{< figure src="/images/crying.gif" width=500 >}}

{{% small %}}
C'est arrivé à la personne qui a écrit ces slides...
{{% /small %}}

---

## Comment éviter ça?

- Répliquer votre dépôt sur une ou plusieurs machines !
- Git est pensé pour gérer ce de problème

---

## Gestion de version décentralisée

- Chaque utilisateur maintient une version du dépôt _local_ qu'il peut changer à souhait
- Ils peuvent "pousser" une version sur un dépôt **distant**
- Un dépôt _local_ peut avoir plusieurs dépôts **distants**.

---

## Centralisé vs Décentralisé

{{< figure src="/images/cvsdcvs.png" width=800 >}}

{{% small %}}

[Source: Geek for Geeks](https://www.geeksforgeeks.org/centralized-vs-distributed-version-control-which-one-should-we-choose)

Cela rends la manipulation un peu plus complexe, allons-y pas à pas :-)

{{% /small %}}

---

## 🎓 Exercice: Créer un dépôt distant

- Rendez vous sur [GitHub](https://github.com)
  - Créez un nouveau dépôt distant en cliquant sur "New" en haut à gauche
  - Appelez le `vehicle-server`
  - Une fois créé, mémorisez l'URL (`https://github.com/...`) de votre dépôt :-)
  - Inscrivez l'URL de votre depot [ici](https://docs.google.com/spreadsheets/d/1DEi13z4QaZzkIZmRwZhoEp85pL5zxt401Qb_ENnB8P4/edit?usp=sharing)

---

## Consulter l'historique de commits

Dans votre workspace

```bash
# Liste tous les commits présent sur la branche main.
git log
```

---

## Associer un dépôt distant (1/2)

Git permet de manipuler des "remotes"

- Image "distante" (sur un autre ordinateur) de votre dépôt local.
- Permet de publier et de rapatrier des branches.
- Le serveur maintient sa propre arborescence de commits, tout comme votre dépôt local.
- Un dépôt peut posséder N remotes.

---

## Associer un dépôt distant (2/2)

```bash
# Liste les remotes associés a votre dépôt
git remote -v

# Ajoute votre dépôt comme remote appelé `origin`
git remote add origin git@github.com:<username>/<repo>.git

# Vérifiez que votre nouveau remote `origin` est bien listé a la bonne adresse
git remote -v
```
---

## Publier une branche dans sur dépôt distant

```bash
# git push <remote> <votre_branche_courante>
git push origin main
```

---

## Que s'est il passé ?

{{< figure src="/images/remote1.svg" width=800 >}}

---

- `git` a envoyé la branche `main` sur le remote `origin`
- ... qui à accepté le changement et mis à jour sa propre branche main.
- `git` a créé localement une branche distante `origin/main` qui suis l'état de `main` sur le remote.
- Vous pouvez constater que la page github de votre dépôt affiche le code source

---

## Refaisons un commit !

```bash
git commit --allow-empty -m "Yet another commit"
git push origin main
```

---

{{< figure src="/images/remote2.svg" width=800 >}}

---

## Branche distante

- Dans votre dépôt local, une branche "distante" est automatiquement maintenue par git
- Elle suit le dernier état connu de la branche sur le remote.
- Pour voir toutes les branches distantes
  - `git branch -a`
- Pour mettre a jour les branches distantes depuis le remote:
  - `git fetch <nom_du_remote>`

---

```bash
# Lister toutes les branches y compris les branches distances
git branch -a

# Notez que est listé remotes/origin/main

# Mets a jour les branches distantes du remote origin
git fetch origin

# Rien ne se passe, votre dépôt est tout neuf, changeons ça!
```

---

## Créez un commit depuis GitHub directement

- Cliquez sur le bouton éditer en haut à droite du "README"
- Changez le contenu de votre README
- Dans la section "Commit changes"
  - Ajoutez un titre de commit et une description
  - Cochez "Commit directly to the main branch"
  - Validez

</br></br>
GitHub crée directement un commit sur la branche main sur le dépôt distant

---

## Rapatrier les changements distants

```bash
# Mets à jour les branches distantes du dépôt origin
git fetch origin

# La branche distante main a avancé sur le remote origin
# => La branche remotes/origin/main est donc mise a jour

# Ouvrez votre README
code ./README.md

# Mystère, le fichier README ne contient pas vos derniers changements?
git log

# Votre nouveau commit n'est pas présent, AHA !
```

---

{{< figure src="/images/remote3.svg" width=800 >}}

---

## Branche Distante VS Branche Locale

Le nouveau commit à été rapatrié

Cependant il n'est pas encore présent sur votre branche main locale

```bash
# Merge la branch distante dans la branche locale.
git merge origin/main
```

---

Vu que votre branche main n'a pas divergé (== partage le même historique) de la branche distante, `git merge` effectue automatiquement un "fast forward".

```bash
Updating 1919673..b712a8e
Fast-forward
 README.md | 1 +

 1 file changed, 1 insertion(+)
```

Cela signifie qu'il fait "avancer" la branche `main` sur le même commit que la branche `origin/main`

---

{{< figure src="/images/remote4.svg" width=800 >}}

---

```bash
# Liste l'historique de commit
git log

# Votre nouveau commit est présent sur la branche main !
# Juste au dessus de votre commit initial !
```

Et vous devriez voir votre changement dans le ficher README.md

---

## Git(Hub|Lab|tea|...)

Un dépôt distant peut être hébergé par n'importe quel serveur sans besoin autre qu'un accès SSH ou HTTPS.

Une multitudes de services facilitent et enrichissent encore git: (GitHub, Gitlab, Gitea, Bitbucket...)

=> Dans le cadre du cours, nous allons utiliser {{< icon familly="brands" name="github" >}} **GitHub**.

---

## git + GitHub = superpowers!

- GUI de navigation dans le code
- Plateforme de gestion et suivi d'issues
- Plateforme de revue de code
- Intégration aux moteurs de CI/CD
- Du force feeding d'IA 🤮
- And so much more...

{{% /section %}}
