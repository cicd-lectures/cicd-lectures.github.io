+++
weight = 70
+++

{{% section %}}

{{< slide template="invert" >}}

## Les fondamentaux de git

---

## Tracer le changement dans le code

avec un **VCS** : 🇬🇧 Version Control System

{{% small %}}
également connu sous le nom de SCM (🇬🇧 Source Code Management)
{{% /small %}}

---

## Pourquoi un VCS ?

- Le code c'est une collection de fichiers textes dans un repertoire
- ... il suffit de sauvegarder ce répertoire pour etre tranquille

</br>
</br>

Pourquoi encore un outil ?

---

- Pour conserver une trace de **tous** les changements dans un historique
  - Avoir un historique des changements effectués
  - Possibilité de revenir en arrière dans les changements!
- Pour **collaborer** efficacement sur une même base de code
  - Gere l'integration de changements dans l'historique
  - Aide à la résolution de conflits
  - Simplifie le partage d'une base de code

---

## Usage d'un VCS

{{< figure src="/images/scm-local.png" title="Local" width="300" >}}

{{< figure src="/images/scm-distributed.png" title="Distribué" width="300" >}}

{{% small %}}
Source : [https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
{{% /small %}}

---

## Quel VCS utiliser ?

{{< figure src="/images/cloudwords-vcs.png" width=500 >}}

---

## Nous allons utiliser **Git**

{{< figure src="/images/git-logo.png" >}}

[https://git-scm.com/](https://git-scm.com)

---

- Git nous permets de transformer notre répertoire en dépôt
- Nous allons pouvoir ensuite ajouter des fichier au  dépôt
- ...et ensuite les changer!

---

## 🎓 Exercice : Intitialiser un dépôt Git

- Dans le terminal de votre environnement GitPod:
- Créez un dossier vide nommé `projet-vcs-1` dans le répertoire `/workspace`, puis positionnez-vous dans ce dossier

```bash
mkdir -p /workspace/projet-vcs-1/
cd /workspace/projet-vcs-1/
```

---

- Est-ce qu'il y a un dossier `.git/` ?
- Essayez la commande `git status` ?

- Initialisez le dépôt git avec `git init`
  - Est-ce qu'il y a un dossier `.git/` ?
  - Essayez la commande `git status` ?

---

## ✅ Solution : Intitialiser un dépôt Git

```bash
mkdir -p /workspace/projet-vcs-1/
cd /workspace/projet-vcs-1/
ls -la # Pas de dossier .git
git status # Erreur "fatal: not a git repository"
git init ./
ls -la # On a un dossier .git
git status # Succès avec un message "On branch master No commits yet"
```

---

## Les 3 états d'un fichier dans un dépôt Git

- L'historique ("Version Database") : dossier `.git`
- Dossier de votre projet ("Working Directory") - Commande
- La zone d'index ("Staging Area")

</br>

{{< figure src="/images/git-3-etats.png" width=500 >}}

---

## 🎓 Exercice : Ajouter un fichier

- Créez un fichier `README.md` dedans avec un titre et vos nom et prénoms
  - Essayez la commande `git status` ?
- Ajoutez le fichier à la zone d'indexation à l'aide de la commande `git add (...)`
  - Essayez la commande `git status` ?
- Créez un commit qui ajoute le fichier `README.md` avec un message, à l'aide de la commande `git commit -m <message>`
  - Essayez la commande `git status` ?

---

## 🎓 Solution : Ajouter un fichier

```bash
echo "# Read Me\n\nObi Wan" > ./README.md
git status # Message "Untracked file"

git add ./README.md
git status # Message "Changes to be committed"
git commit -m "Ajout du README au projet"
git status  # Message "nothing to commit, working tree clean"
```

---

## Terminologie de Git - Diff et changeset


**diff:** un ensemble de lignes "changées" sur un fichier donné

{{< figure src="/images/diff.png" width=600 >}}

**changeset:** un ensemble de "diff" (donc peut couvrir plusieurs fichiers)

{{< figure src="/images/changeset.png" width=400 >}}

---

## Terminologie de Git - Commit

**commit:** un changeset qui possède un (commit) parent, associé à un message


{{< figure src="/images/commit.png" width=800 >}}

_"HEAD"_: C'est le dernier commit dans l'historique

{{< figure src="/images/scm-basics-legend.png" >}}

<br/>

{{< figure src="/images/scm-basics-history.png" >}}

---

## 🎓 Exercice :avec Git - 2

- Afficher la liste des commits
- Afficher le changeset associé à un commit
- Modifier du contenu dans `README.md` et afficher le diff
- Annulez ce changement sur `README.md`

---

## ✅ Solution : avec Git - 2

```bash
git log

git show # Show the "HEAD" commit
echo "# Read Me\n\nObi Wan Kenobi" > ./README.md

git diff
git status

git restore README.md
git status
```

---

## Terminologie de Git - Branche

- Abstraction d'une version "isolée" du code
- Concrètement, une **branche** est un alias pointant vers un "commit"

{{< figure src="/images/scm-branches.png" >}}

---

## 🎓 Exercice :avec Git - 3

- Créer une branche nommée `feature/html`
- Ajouter un nouveau commit contenant un nouveau fichier `index.html` sur cette branche
- Afficher le graphe correspondant à cette branche avec `git log --graph`

---

## ✅ Solution : avec Git - 3

```bash
git branch feature/html && git switch feature/html
# Ou git switch --create feature/html
echo '<h1>Hello</h1>' > ./index.html
git add ./index.html && git commit --message="Ajout d'une page HTML par défaut" # -m / --message

git log
git log --graph
git lg # cat ~/.gitconfig => regardez la section section [alias], cette commande est déjà définie!
```

---

## Terminologie de Git - Merge

- On intègre une branche dans une autre en effectuant un *merge*
- Plusieurs strategies sont possibles pour merger:
  - Quand l'historique de commit n'a pas diverge: git fait avancer la branche directement, c'est un **fast-forward**
  - Dans le cas contraire, un nouveau commit est créé, fruit de la combinaison de 2 autres commits


{{< figure src="/images/scm-merge.png" width=400 >}}

---

## 🎓 Exercice :avec Git - 4

- Merger la branche `feature/html` dans la branche principale
  - ⚠️ Pensez à utiliser l'option `--no-ff` (no fast forward) pour forcer git a créer un commit de merge.
- Afficher le graphe correspondant à cette branche avec `git log --graph`

---

## ✅ Solution : avec Git - 4

```bash
git switch main
git merge --no-ff feature/html # Enregistrer puis fermer le fichier 'MERGE_MSG' qui a été ouvert
git log --graph

# git lg
```

---

## Exemple d'usages de VCS

- "Infrastructure as Code" :
  - Besoins de traçabilité, de définition explicite et de gestion de conflits
  -  Collaboration requise pour chaque changement (revue, responsabilités)

- Code Civil:
  - {{< linkurl "https://github.com/steeve/france.code-civil" >}}
  - {{< linkurl "https://github.com/steeve/france.code-civil/pull/40" >}}
  - {{< linkurl "https://github.com/steeve/france.code-civil/commit/b805ecf05a86162d149d3d182e04074ecf72c066" >}}

---

## 🎯 Checkpoint

On a vu :

- A quoi sert `git` et sa nomenclature de base (diff, changest, commit, branch)
- A quoi reconnaître un dépôt initialisé local et l'espace de travail associé
- Comment utiliser git localement (ajouter au staging, commiter)
- l'historique et un merge avec git (localement)

{{% /section %}}
