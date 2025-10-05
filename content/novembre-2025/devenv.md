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
- Pour que tout le monde utilise les memes outils dans les bonnes versions on se propose d'utiliser un environement de dévelopement standardisé.
- Ce n'est pas un problème nouveau, et une solution basée Docker a émergé pour régler ce problème
  - ➡️ [Les development containers (DevContainers)](https://containers.dev/)

---

## VSCode et les Dev Containers

VSCode propose une intégration pour les Devcontainers

{{< figure src="https://code.visualstudio.com/assets/docs/devcontainers/containers/architecture-containers.png">}}

---

## Démarrer l'environement de dévelopement (Linux && MacOS Edition)🚀

Sous Linux, ouvrez un terminal et jouez les commandes suivantes

```bash
cd ~
curl -sSL https://raw.githubusercontent.com/cicd-lectures/devenv/refs/heads/main/install.sh | bash
```

---

## Démarrer l'environement de dévelopement (Windows)

- Créer un répertoire

---

## Checkpoint 🎯

- Vous devriez pouvoir taper la commande `whoami` dans le terminal de VSCode:
  - Retour attendu: `node`

- Vous devriez pouvoir fermer le fichier "Get Started"...
  - ... et ouvrir le fichier ``.devcontainer.json``

{{% small %}}
On peut commencer !
{{% /small %}}

{{% /section %}}
