+++
weight = 40
+++

{{% section %}}

{{< slide template="invert" >}}

## Préparer votre environnement de travail

---

## Outils Nécessaires 🛠

- Un ordinateur avec VSCode et Docker d'installé
  - De préférence sous Linux.
  - On peut tenter sous Windows et MacOS
- Un compte sur [{{< icon familly="brands" name="github" >}} GitHub](https://github.com)
- On va vous demander de travailler en binôme, commencez à réfléchir avec qui vous souhaitez travailler !
- Indiquez votre handle GitHub [ici](https://docs.google.com/spreadsheets/d/1DEi13z4QaZzkIZmRwZhoEp85pL5zxt401Qb_ENnB8P4/edit?usp=sharing)!

---

## Les DevContainers

- On va avoir besoin d'un certain nombre d'outils dans ce cours
- Pour que tout le monde utilise les mêmes outils dans les bonnes versions on se propose d'utiliser un environement de dévelopement reproductible.
- Ce n'est pas un problème nouveau, et une solution basée Docker existe:
  - ➡️ [Les development containers (DevContainers)](https://containers.dev/)

---

## VSCode et les Dev Containers

VSCode propose une intégration pour les DevContainers

{{< figure src="https://code.visualstudio.com/assets/docs/devcontainers/containers/architecture-containers.png">}}

---

## Démarrer l'environement de dévelopement (Linux & MacOS Edition)🚀

Sous Linux, ouvrez un terminal et jouez les commandes suivantes

```bash
curl -sSL https://raw.githubusercontent.com/cicd-lectures/devenv/refs/heads/main/install.sh | bash
```

VSCode devrait apparaitre et devrait vous proposer de réouvrir le projet dans un devcontainer, acceptez :)

---

## Démarrer l'environement de dévelopement (Windows)

- **Prérequis**: VSCode d'installé et Docker Desktop
- Créer un répertoire devenv
- Créér un fichier `.devcontainer.json` avec [ce contenu](https://raw.githubusercontent.com/cicd-lectures/devenv/refs/heads/main/.devcontainer.json)
- Ouvrir VSCode dans ce répertoire
- Installer l'extension [DevContainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

VSCode devrait apparaitre et devrait vous proposer de réouvrir le projet dans un devcontainer, acceptez :)

---

## Checkpoint 🎯

- Vous devriez pouvoir taper la commande `whoami` dans le terminal de VSCode:
  - Retour attendu: `node`

- Vous devriez pouvoir taper la commande `docker ps`
  - ... et ne pas voir de message d'erreur 🤡

- Vous devriez pouvoir fermer le fichier "Get Started"...
  - ... et ouvrir le fichier ``.devcontainer.json``

---

## Authentification avec GitHub

Nous allons avoir besoin d'intéragir avec GitHub depuis notre DevContainer, nous devons donc nous authentifier aupres de GitHub.

1. Dans le terminal de VSCode on tapez la commande suivante:

```bash
gh auth login --git-protocol ssh --hostname github.com --web`
```

2. On accepte de générer une nouvelle clé SSH pour le compte
3. On ne mets pas de passphrase (ou alors on s'en souvient 🤪),
4. On indique un Titre (DevContainer Cours CICD par exemple 👀)
5. On appuie sur `Entrée` pour ouvrir la page de login GitHub
6. On sélectionne son compte, et on tape le code a usage unique indiqué dans la console

---

## Checkpoint 🎯

- Vous devriez maintenant être en mesure de taper la commande suivante:
    - `ssh git@github.com`
- Et de voir le message suivant

```
Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
```

{{% small %}}
On peut commencer !
{{% /small %}}

{{% /section %}}
