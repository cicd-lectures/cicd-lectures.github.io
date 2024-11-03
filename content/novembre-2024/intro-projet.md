+++
weight = 80
+++

{{% section %}}

{{< slide template="invert" >}}

## Présentation de votre projet

---

## Contexte(1/4)

- Voi est une société qui fournit un service de "véhicules de transport doux" à la demande
  - 🔓 Vous déverrouillez un véhicule avec votre Smartphone
  - 🛴 Vous faites votre trajet avec le véhicule
  - 🔒 Vous verrouillez et laissez le véhicule sur votre lieu d'arrivée
  - 💸 Vous payez le temps passé sur le véhicule

---

## Contexte(2/4)

Un cas d'utilisation majeur est de permettre aux utilisateurs de trouver un véhicule proche d'eux facilement.

{{< figure src="/images/voimap.jpeg"  width=256 >}}

---

## Contexte(3/4)

- Ce service est assuré par une API HTTP appelée `vehicle-server` qui doit supporter les fonctionnalités suivantes:
  - Enregistrer un véhicule
  - Trouver les N véhicules les plus proches de soi
  -  Supprimer un véhicule

---

## Contexte (4/4)

* Voi est entrain de reconstruire cette fonctionnalité et à décidé de sous-traiter le développement de ce projet a l'ENSG...
* Une équipe technique de **Voi** avait commencé l'implémentation du serveur, et vous à mis à disposition une archive [ici](https://cicd-lectures.github.io/assets/vehicle-server.tar.gz), contenant le code source du projet.

---

## Prise en Main du Projet

```bash
cd /workspace

# Téléchargez le projet sur votre environnement de développement
curl -sSLO https://cicd-lectures.github.io/assets/vehicle-server.tar.gz

# Décompresser et extraire l'archive téléchargée
tar xvzf ./vehicle-server.tar.gz

cd ./vehicle-server-ts
```

A partir de la vous pouvez ouvrir le fichier `README.md` et commencer à suivre ses instructions.

---

{{< slide template="invert" >}}

## Qu'est-ce qui va / ne va pas dans ce projet d'après vous?

---

## Triste Rencontre avec la Réalité

- Pas de gestion de version
- `node_modules` nous est fourni tel quel, aucun moyen de le reconstruire.
- Le projet ne fonctionne pas complètement,
  - delete réponds un erreur 😭
  - create accepte un shortcode de 6 caractères, et en demande 4!
- On lance le js directmeent depuis `dist`...mais on ne sait pas le générer!

---

## 🎓 Exercice : Initialisez un dépôt git

- Supprimez les répertoires `dist`, `node_modules` et l'archive
- Mettez en place un fichier `.gitignore` qui vous évitera de comitter `dist/` et `node_modules`!
- Initialisez un dépôt git dans le répertoire
- Créez un premier commit, avec uniquement le code source Typescript

---

## ✅ Solution : Initialisez un dépôt git

```bash
# Suppression des fichiers générés
rm -f /workspace/vehicle-server.tar.gz
rm -rf ./dist ./node_modules

# Création et édition du fichier .gitignore
code .gitignore

# On initialise un nouveau dépôt git
git init

# On ajoute tous les fichiers contenus a la zone de staging.
git add .

# On crée un nouveau commit
git commit -m "Add initial vehicle-server project files"
```

Contenu du fichier `.gitignore`

```
node_modules/
dist/
```

---

## Checkpoint 🎯

- Vous avez récupéré un projet typescript qui semble fonctionner...
  - ..mais pas vraiment à l'état de l'art.

- Application des chapitres précédents : vous avez initialisé un projet `git` local

{{% /section %}}
