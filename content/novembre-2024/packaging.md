+++
weight = 160
+++

{{% section %}}

{{< slide template="invert" >}}

{{< figure src="/images/docker-logo-monochromatic.png" width=200 >}}

Rappels et remise à niveau

---

## Quel est le problème résolu par docker?

{{< figure src="/images/matrixfromhell.jpg" >}}

Problème de temps **exponentiel**

---

## Déjà vu ?

L'IT n'est pas la seule industrie à résoudre des problèmes...

{{< figure src="/images/also-a-matrix-from-hell.png" >}}

---

## ✅ Solution: Le conteneur intermodal

"Separation of Concerns"

{{< figure src="/images/blue-shipping-container.png" >}}

---

## Comment ça marche ?

"Virtualisation **Légère**"

{{< figure src="/images/container_vs_vm.jpg" >}}

---

## Conteneur != VM

"Separation of concerns": 1 "tâche" par conteneur

{{< figure src="/images/vm-and-container.png" >}}

---

##  VMs && Conteneurs

Non exclusifs mutuellement

{{< figure src="/images/cont-vm-not-excl.png" >}}

---

## 🎓 Exercice : où est mon conteneur ?

* Retournez dans Gitpod
* Dans un terminal, exécutez les commandes suivantes :

```bash
# Affichez la liste de tous les conteneurs en fonctionnement (aucun)
docker container ls

# Exécutez un conteneur
docker container run hello-world # Equivalent de l'ancienne commande 'docker run'


docker container ls
docker container ls --all
# Quelles différences ?
```

---

## 🩻 Anatomie

* Un service "Docker Engine" tourne en tâche de fond et publie une API REST
* La commande `docker run ...` a envoyé une requête `POST` au service
* Le service a télécharge une **Image** Docker depuis le registre **DockerHub**,
* Puis a exécuté un **conteneur** basé sur cette image

---

## ✅ Solution : Où est mon conteneur ?

Le conteneur est toujours présent dans le "Docker Engine" même en étant arrêté

```bash
CONTAINER ID   IMAGE         COMMAND    CREATED          STATUS                      PORTS     NAMES
109a9cdd3ec8   hello-world   "/hello"   33 seconds ago   Exited (0) 17 seconds ago             festive_faraday
```

- Un conteneur == une commande "conteneurisée"
  - cf. colonne "*COMMAND*"

- Quand la commande s'arrête : le conteneur s'arrête
  - cf. code de sortie dans la colonne "*STATUS*"

---

## 🎓 Exercice : Cycle de vie d'un conteneur en tâche de fond

- Lancez un nouveau conteneur en tâche de fond, nommé `webserver-1` et basé sur l'image `nginx`
  - 💡 `docker container run --help` ou [Documentation en ligne](https://docs.docker.com/engine/reference/commandline/container_run)

- Affichez les "logs" du conteneur (==traces d'exécution écrites sur le stdout + stderr de la commande conteneurisée)
  - 💡 `docker container logs  --help` ou [Documentation en ligne](https://docs.docker.com/engine/reference/commandline/container_logs/)

- Comparez les versions de Linux de Gitpod et du conteneur
  - Regardez le contenu du fichier `/etc/os-release`
  - 💡 `docker container exec`

---

## ✅ Solution : Cycle de vie d'un conteneur en tâche de fond

```bash
docker container run --detach --name=webserver-1 nginx
# <ID du conteneur>

docker container ls

docker container logs webserver-1

cat /etc/os-release
# ... Ubuntu ...
docker container exec webserver-1 cat /etc/os-release
# ... Debian ...
```

---

## 🤔 Comment accéder au serveur web en tâche de fond ?

```bash
$ docker container ls
CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
ee5b70fa72c3   nginx     "/docker-entrypoint.…"   3 seconds ago   Up 2 seconds   80/tcp    webserver-1
```

- ✅ Super, le port 80 (TCP) est annoncé (on parle d'"exposé")...
- ❌ ... mais c'est sur une adresse IP privée

```bash
docker container inspect \
  --format='{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
  webserver-1
```

---

## 🎓 Exercice : Accéder au serveur web via un port publié

- **But :** Créez un nouveau conteneur `webserver-public` accessible publiquement

- Utilisez le port `8080` publique
- 💡 Flag `--publish` pour `docker container run`
- 💡 GitPod va vous proposer un popup : choisissez "Open Browser"

---

## ✅ Solution : Accéder au serveur web via un port publié

```bash
docker container run --detach --name=webserver-public --publish 8080:80 nginx
# ... container ID ...

docker container ls
# Le port 8080 de 0.0.0.0 est mappé sur le 80 du conteneur

curl http://localhost:8080
# ...
```

---

## 🤔 D'où vient "hello-world" ?

- [Docker Hub](https://hub.docker.com) : C'est le registre d'images "par défaut"
  - Exemple : Image officielle de [nginx](https://hub.docker.com/_/nginx)

- 🎓 Cherchez l'image `hello-world` pour en voir la page de documentation
  - 💡 pas besoin de créer de compte pour ça

- Il existe d'autre "registres" en fonction des besoins (GitHub GHCR, Google Artifact Registry, etc.)

---

## 🤔 Que contient "hello-world" ?

- C'est une "image" de conteneur, c'est à dire un modèle (template)
représentant une application auto-suffisante.
  - On peut voir ça comme un "paquetage" autonome

- C'est un système de fichier complet:
  - Il y a au moins une racine `/`
  - Ne contient que ce qui est censé être nécessaire (dépendances, librairies, binaires, etc.)

---

## 🤔 Pourquoi des images ?

- Un **conteneur** est toujours exécuté depuis une *image*.
- Une **image de conteneur** (ou "Image Docker") est un  modèle ("template") d'application auto-suffisant.

=> Permet de fournir un livrable portable (ou presque).

---

🤔 Application Auto-Suffisante ?

{{< figure src="/images/docker-app-self-sufficient.png" width=900 >}}

---

## C'est quoi le principe ?

{{< figure src="/images/dockerfile-flow.png" >}}

---

## 🤔 Pourquoi fabriquer sa propre image ?

Essayez ces commandes dans Gitpod :

```bash
cat /etc/os-release
# ...
git --version
# ...

# Même version de Linux que dans GitPod
docker container run --rm ubuntu:20.04 git --version
# docker: Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "git": executable file not found in $PATH: unknown.

# En interactif ?
docker container run --rm --tty --interactive ubuntu:20.04 git --version
```

=> Problème : git n'est même pas présent !

---

## 🎓 Fabriquer sa première image

- **But :** fabriquer une image Docker qui contient `git`
- Dans votre workspace Gitpod, créez un nouveau dossier `/workspace/docker-git/`
- Dans ce dossier, créer un fichier `Dockerfile` avec le contenu ci-dessous :

```Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install --yes --no-install-recommends git
```

- Fabriquez votre image avec la commande `docker image build --tag=docker-git <chemin/vers/docker-git/`
- Testez l'image fraîchement fabriquée
  - 💡 `docker image ls`

---

## ✅ Fabriquer sa première image

```bash
mkdir -p /workspace/docker-git/ && cd /workspace/docker-git/

cat <<EOF >Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install --yes --no-install-recommends git
EOF

docker image build --tag=docker-git ./

docker image ls | grep docker-git

# Doit fonctionner
docker container run --rm docker-git:latest git --version
```

---

## Conventions de nommage des images

```
[REGISTRY/][NAMESPACE/]NAME[:TAG|@DIGEST]
```

- Pas de Registre ? Défaut: `registry.docker.com`
- Pas de Namespace ? Défaut: `library`
- Pas de tag ? Valeur par défaut: `latest`
  - ⚠️ Friends don't let friends use `latest`
- Digest: signature unique basée sur le contenu

---

## Conventions de nommage : Exemples

- `ubuntu:20.04` => `registry.docker.com/library/ubuntu:20.04`
- `dduportal/docker-asciidoctor` => `registry.docker.com/dduportal/docker-asciidoctor:latest`
- `ghcr.io/dduportal/docker-asciidoctor:1.3.2@sha256:xxxx`

---

## 🎓 Utilisons les tags

- Il est temps de "taguer" votre première image !

```bash
docker image tag docker-git:latest docker-git:1.0.0
```

- Testez le fonctionnement avec le nouveau tag
- Comparez les 2 images dans la sortie de `docker image ls`

---

## ✅ Utilisons les tags

```bash
docker image tag docker-git:latest docker-git:1.0.0

# 2 lignes
docker image ls | grep docker-git
# 1 ligne
docker image ls | grep docker-git | grep latest
# 1 ligne
docker image ls | grep docker-git | grep '1.0.0'

# Doit fonctionner
docker container run --rm docker-git:1.0.0 git --version
```

---

## 🎓 Mettre à jour votre image (1.1.0)

- Mettez à jour votre image en version `1.1.0` avec les changements suivants :
  - Ajoutez un [`LABEL`](https://docs.docker.com/engine/reference/builder/#label) dont la clef est `description` (et la valeur de votre choix)
  - Configurez `git` pour utiliser une branche `main` par défaut au lieu de `master` (commande `git config --global init.defaultBranch main`)

- Indices :
  - 💡 Commande `docker image inspect <image name>`
  - 💡 Commande `git config --get init.defaultBranch` (dans le conteneur)
  - 💡 Ajoutez des lignes *à la fin* du `Dockerfile`
  - 💡 [Documentation de référence des `Dockerfile`](https://docs.docker.com/engine/reference/builder/)

---

## ✅ Mettre à jour votre image (1.1.0)

```bash
cat ./Dockerfile
FROM ubuntu:20.04
RUN apt-get update && apt-get install --yes --no-install-recommends git
LABEL description="Une image contenant git préconfiguré"
RUN git config --global init.defaultBranch main

docker image build -t docker-git:1.1.0 ./docker-git/
# Sending build context to Docker daemon  2.048kB
# Step 1/4 : FROM ubuntu:20.04
#  ---> e40cf56b4be3
# Step 2/4 : RUN apt-get update && apt-get install --yes --no-install-recommends git
#  ---> Using cache
#  ---> 926b8d87f128
# Step 3/4 : LABEL description="Une image contenant git préconfiguré"
#  ---> Running in 0695fc62ecc8
# Removing intermediate container 0695fc62ecc8
#  ---> 68c7d4fb8c88
# Step 4/4 : RUN git config --global init.defaultBranch main
#  ---> Running in 7fb54ecf4070
# Removing intermediate container 7fb54ecf4070
#  ---> 2858ff394edb
Successfully built 2858ff394edb
Successfully tagged docker-git:1.1.0

docker container run --rm docker-git:1.0.0 git config --get init.defaultBranch
docker container run --rm docker-git:1.1.0 git config --get init.defaultBranch
# main
```

---

Bon... pourquoi je vous embête avec tout ça?

---

## Docker est un moyen idéal de livrer notre application!

- Notre application à besoin:
  - De NodeJS en version 20.x
  - De nos dépendances de production
  - Du code généré pour s'exécuter
- Docker nous permet de packager tout ça en une seule image!
- C'est le """standard""" du moment

---

## 🎓 Construire une Image du Vehicle Server

- A partir de l'image de base NodeJS link:https://hub.docker.com/_/node[Node] construisez une image du vehicle-server
- Il vous faut copier les sources avec l'instruction [COPY](https://docs.docker.com/reference/dockerfile/)
- Compiler le serveur
- Faire en sorte que le point d'entrée de l'image soit le serveur (en utilisant [ENTRYPOINT](https://docs.docker.com/reference/dockerfile/#entrypoint))
- L'image doit être utilisable avec la commande suivante:
- Vous pouvez obtenir l'IP de votre container de database (une fois lancé) en utilisant `docker container inspect`.

```bash
docker run \
    --tty
    --interactive
    --rm \
    --env PORT=8080 \
    --env DB_PORT=5432 \
    --env DB_HOST="${DATABASE_SERVER_IP}" \
    --publish 8080:8080 \
    image:tag
```

---

## ✅ Construire une Image du Vehicle Server

```Dockerfile
FROM node:20-alpine3.19
COPY . /app
WORKDIR /app
RUN npm install && \
  npm run build

ENTRYPOINT ["node", "/app/dist/index.js"]
```

---

## Qu'avons nous construit?

- On part d'une image de base avec NodeJS
- On copie l'intégralité de nos sources dedans
- On Installe nos dépendances
- On compile le code Typescript

---

## Est'ce que c'est efficace?

- L'image finale fait ~220Mb
- Mais on embarque toutes nos dépendances et nos fichiers de configurations!
- On peut faire plus léger en utilisant
  - Le [multi stage build de Docker](https://docs.docker.com/build/building/multi-stage/) qui nous permets de faire plusieurs étapes dans la création de notre image!
  - Les fonctionalité de npm pour installer seulement les dépendances de production!

---

## Multi-Stage build kesako?

- Cela permet d'avoir plusieurs instructions `FROM` dans un Dockerfile, qui vont créer plusieurs images intermédiaires
- On peut nommer nos étapes en utilisat `FROM xxx AS <stage name>`
- On peut récupérer des fichiers d'une étape précédente en utilisant `COPY --from <stage name> /path1 /path`
- Seule la dernière étape du `Dockerfile` est taggée!

---

## 🎓 Optimiser l'Image du Vehicle Server

En partant de votre Dockerfile, creez un build en deux étapes:

- **1.**: Une étape qui transpile l'application Typescript vers Javascript
- **2.**: Une étape qui installe les dépendances de production uniquement et qui copie le code JS généré depuis l'étape de build.

---

## ✅ Optimiser l'Image du Vehicle Server

```Dockerfile
FROM node:20-alpine3.19 AS build
COPY . /app
WORKDIR /app
RUN npm install && \
  npm run build

FROM node:20-alpine3.19 AS runtime
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./package-lock.json .
RUN npm install --production
COPY --from=build /app/dist /app/dist

ENTRYPOINT ["node", "/app/dist/index.js"]
```

Quelle est la taille de l'image?

---

## Checkpoint 🎯

- Une image Docker fournit un environnement de système de fichier auto-suffisant (application, dépendances, binaires, etc.) comme modèle de base d'un conteneur
- On peut spécifier une recette de fabrication d'image à l'aide d'un `Dockerfile` et de la commande `docker image build`
- Les images Docker ont une convention de nommage permettant d'identifier les images très précisément
- Nous avons maintenant une image Docker pour distribuer notre serveur!

Une fois que votre image fonctionne, vous pouvez ouvrir une PR avec ce Dockerifle et la merger

{{% /section %}}
