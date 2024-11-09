+++
weight = 120
+++

{{% section %}}

{{< slide template="invert" >}}

## Intégration Continue (CI)

*Continuous Integration doesn’t get rid of bugs*

*But it does make them dramatically easier to find and remove.*

*Martin Fowler*

---

## Pourquoi faire de L'Intégration Continue ?

*But :* Détecter les fautes au plus tôt pour en limiter le coût

{{< figure src="/images/big-bugs.jpg" width=800 >}}

{{% small %}}
Source : http://cartoontester.blogspot.be/2010/01/big-bugs.html
{{% /small %}}

---

## Qu'est ce que l'Intégration Continue ?

**Objectif :** que l'intégration de code soit un _non-évènement_

- Construire et intégrer le code **en continu**
- Le code est intégré **souvent** (au moins quotidiennement)
- Chaque intégration est validée de façon **systématique** et **automatisée**
- On joue une collection de vérifications qui atteste que le changement ne casse pas l'existant
  - compilation, tests, lint etc...

---

## Et concrètement ? 1/2

{{< figure src="/images/fail-fast-continuous-integration.png" height=250 >}}

- Un•e dévelopeu•se•r ajoute du code/branche/PR :
  - une requête HTTP est envoyée au système de "CI"
- Le système de CI compile et teste le code
- On ferme la boucle : Le résultat est renvoyé au dévelopeu•se•r•s

---

## Et concrètement ? 2/2

{{< figure src="/images/ghci.svg" width=800 >}}

---

## Quelques moteurs de CI connus

- A héberger soit-même : [Jenkins](https://www.jenkins.io/), [GitLab CI](https://about.gitlab.com/), [Drone CI](https://www.drone.io) [CDS](https://ovh.github.io/cds)...
- Hébergés en ligne : [Travis CI](https://travis-ci.org), [Semaphore CI](https://semaphoreci.com/), [CircleCI](https://circleci.com/), [Code Fresh](https://codefresh.io),  [GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/quickstart)

---

## GitHub Actions

GitHub Actions est un moteur de CI/CD intégré à GitHub

- ✅ : Très facile à mettre en place, gratuit et intégré complètement
- ❌ : Utilisable uniquement avec GitHub, et DANS la plateforme GitHub

---

## Concepts de GitHub Actions

{{< figure src="/images/gh-actions-concepts.svg" width=800 >}}

---

- Sur un évènement déclencheur
- GitHub crée un ou plusieurs environment d'exécution (Runner)
- Et exécute une ou plusieurs suites d'étapes
- Enfin la (les) runner(s) sont détruits une fois toutes les étapes exécutées

---

## Concepts de GitHub Actions - Step 1/3

{{< figure src="/images/gh-actions-concepts.steps.svg" width=800 >}}

---

## Concepts de GitHub Actions - Step 2/3

Une **Step** (étape) est une tâche individuelle à faire effectuer par le CI :

- Par défaut c'est une commande à exécuter - mot clef `run`
- Ou une "action" (quel est le nom du produit déjà ?) - mot clef `uses`
  - Réutilisables et [partageables](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/finding-and-customizing-actions)!

---

```yaml
steps: # Liste de steps
  # Exemple de step 1 (commande)
  - name: Say Hello
    run: echo "Hello ENSG"
  # Exemple de step 2 (une action)
  - name: 'Login to DockerHub'
    uses: docker/login-action@v1 # https://github.com/marketplace/actions/docker-login
    with:
      username: ${{ secrets.DOCKERHUB_USERNAME }}
      password: ${{ secrets.DOCKERHUB_TOKEN }}
```

---

## Concepts de GitHub Actions - Step 3/3

Une *Step* peut avoir des outputs

```yaml
steps:
  - name: "Install Node"
    uses: actions/setup-node@v4
    id: setup_node
    with:
      node-version: '22.04'

  - name: "Echo installed version"
    run: |
      echo "${{steps.setup_node.outputs.node-version}}"
```

---

## Concepts de GitHub Actions - Job 1/2

{{< figure src="/images/gh-actions-concepts.jobs.svg" width=800 >}}

---

## Concepts de GitHub Actions - Job 2/2

Un *Job* est un groupe logique de steps :

- Enchaînement _séquentiel_ de steps
- 1 Job == 1 Runner créé
- Regroupement logique :
  - Exemple : "compiler puis tester le résultat de la compilation"

```yaml
jobs: # Map de jobs
  build: # 1er job, identifié comme 'build'
    name: 'Build Slides'
    runs-on: ubuntu-22.04 # cf. prochaine slide "Concepts de GitHub Actions - Runner"
    steps: # Collection de steps du job
      - name: 'Build the JAR'
        run: mvn package
      - name: 'Run Tests on the JAR file'
        run: mvn verify
  deploy: # 2nd job, identifié comme 'deploy'
    # ...
```

---

## Concepts de GitHub Actions - Runner

Un *Runner* est un serveur distant sur lequel s'exécute un job.

- Mot clef `runs-on` dans la définition d'un job
- Défaut : machine virtuelle Ubuntu dans le cloud utilisé par GitHub
- https://docs.github.com/en/free-pro-team@latest/actions/reference/specifications-for-github-hosted-runners[D'autres types sont disponibles,window=_blank]
(macOS, Windows, etc.)
- Possibilité de fournir [son propre serveur](https://docs.github.com/en/free-pro-team@latest/actions/reference/specifications-for-github-hosted-runners)

---

## Concepts de GitHub Actions - Workflow 1/2

{{< figure src="/images/gh-actions-concepts.workflows.svg" width=800 >}}

---

## Concepts de GitHub Actions - Workflow 2/2

Un *Workflow* est une procédure automatisée composée de plusieurs jobs,
décrite par un fichier YAML.

* On parle de "Workflow/Pipeline as Code"
* Chemin : `.github/workflows/<nom du workflow>.yml`
* On peut avoir _plusieurs_ fichiers donc _plusieurs_ workflows

```bash
.github/workflows
├── ci-cd.yaml
├── bump-dependency.yml
└── nightly-tests.yaml
```

---

## Concepts de GitHub Actions - Évènement 1/2

{{< figure src="/images/gh-actions-concepts.svg" width=800 >}}

---

## Concepts de GitHub Actions - Évènement 2/2

Un *évènement* du projet GitHub (push, merge, nouvelle issue, etc. ) déclenche l'exécution du workflow

- Plein de type d'évènements : push, issue, alarme régulière, favori, fork, etc.
  - Exemple : "Nouveau commit poussé", "chaque dimanche à 07:00", "une issue a été ouverte" ...

- Un workflow spécifie le(s) évènement(s) qui déclenche(nt) son exécution
  - Exemple : "exécuter le workflow lorsque un nouveau commit est poussé ou chaque jour à 05:00 par défaut"

---

## Concepts de GitHub Actions : Exemple Complet

```yaml
{{< snippet src="snippets/npm-example.yml" >}}
```

---

## Essayons GitHub Actions

- **But** : nous allons créer notre premier workflow dans GitHub Actions

- N'hésitez pas à utiliser la documentation de GitHub Actions:
  - [Acceuil](https://docs.github.com/en/free-pro-team@latest/actions)
  - [Quickstart](https://docs.github.com/en/free-pro-team@latest/actions/quickstart)
  - [Référence](https://docs.github.com/en/free-pro-team@latest/actions/reference)

---

## Exemple simple avec GitHub Actions

- Retournez dans le dépôt créé précédemment dans votre environnement GitPod
- Dans le projet "vehicle-server", sur la branch `main`,
  - Créez le fichier `.github/workflows/bonjour.yml` avec le contenu suivant :

```yaml
{{< snippet src="snippets/say-hello-full.yml" tags="common,simple-hello">}}
```

- Commitez puis poussez
- Revenez sur la page GitHub de votre projet et naviguez dans l'onglet "Actions" :
  - Voyez-vous un workflow ? Et un Job ? Et le message affiché par la commande `echo` ?

---

## Exemple simple avec GitHub Actions : Récapépète

{{< figure src="/images/gh-actions-simple-example.svg" width=800 >}}

---

## Exemple GitHub Actions : Checkout

- Supposons que l'on souhaite utiliser le code du dépôt...
  - Essayez: modifiez le fichier `bonjour.yml` pour afficher le contenu de `README.md` :

```yaml
{{< snippet src="snippets/say-hello-full.yml" tags="common,show-readme">}}
```

Est-ce que l'étape "`cat README.md`" se passe bien ? (SPOILER: non ❌ )

---

## 🎓 Exercice GitHub Actions : Checkout

- **But** : On souhaite récupérer ("checkout") le code du dépôt dans le job

- 👷🏽‍♀️ C'est à vous d'essayer de _réparer_ 🛠 le job :
  - L'étape "`cat README.md`" doit être conservée et doit fonctionner
  - Utilisez l'action "checkout" [Documentation](https://github.com/marketplace/actions/checkout) du marketplace GitHub Action
  - Vous pouvez vous inspirer du [Quickstart](https://docs.github.com/en/free-pro-team@latest/actions/quickstart) de GitHub Actions

---

## ✅ Solution GitHub Actions : Checkout

```yaml
{{< snippet src="snippets/say-hello-full.yml" tags="common,checkout,show-readme">}}
```

---

## Exemple : Environnement d'exécution

- Notre workflow doit s'assurer que "la vache" 🐮 doit nous lire 💬 le contenu du fichier `README.md`
- Essayez la commande `cat README.md | cowsay` dans GitPod
  - Modifiez l'étape "`cat README.md`" du workflow pour faire la même chose dans GitHub Actions
  - SPOILER: ❌ (la commande `cowsay` n'est pas disponible dans le runner GitHub Actions)

---

## Problème : Environnement d'exécution

- **Problème** : On souhaite utiliser les mêmes outils dans notre workflow ainsi que dans nos environnement de développement

- Plusieurs solutions existent pour personnaliser l'outillage, chacune avec ses avantages / inconvénients :
  - Personnaliser l'environnement dans votre workflow: (⚠️ sensible aux mises à jour, ✅ facile à mettre en place)
  - Spécifier un environnement préfabriqué pour le workflow (⚠️ complexe, ✅ portable)
  - Utiliser les fonctionnalités de votre outil de CI (⚠️ spécifique au moteur de CI, ✅ efficacité)

---

## 🎓 Exercice : Personnalisation dans le workflow

- **But** : exécuter la commande `cat README.md | cowsay` dans le workflow comme dans GitPod
- 👷🏽‍♀️ C'est à vous de mettre à jour le workflow pour personnaliser l'environnement :
  - 💡 Cherchez comment installer `cowsay` dans le runner GitHub (`runs-on`, [paquet `cowsay` dans Ubuntu 22.04](https://packages.ubuntu.com/search?keywords=cowsay)

---

## ✅ Solution : Personnalisation dans le workflow

```yaml
{{< snippet src="snippets/say-hello-full.yml" tags="common,checkout,apt-cowsay,run-cowsay">}}
```

---

## 🎓 Exercice : Environnement préfabriqué

- **But** : exécuter la commande `cat README.md | cowsay` dans le workflow comme dans GitPod
  - En utilisant le même environnement que GitPod (même version de cowsay, java, etc.)
- 👷🏽‍♀️ C'est à vous de mettre à jour le workflow pour exécuter les étapes dans la même image Docker que GitPod :
  - 💡 [Image utilisée dans GitPod](https://github.com/cicd-lectures/gitpod/blob/main/.gitpod.yml#L6)
  - 💡 [Utilisation d'un container comme runnner GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idcontainer)
  - 💡 [Contraintes d'exécution de container dans GitHub Actions (`--user=root`)](https://docs.github.com/en/actions/using-github-hosted-runners/using-github-hosted-runners/about-github-hosted-runners#docker-container-filesystem)

---

## ✅ Solution : Environnement préfabriqué

```yaml
{{< snippet src="snippets/say-hello-full.yml" tags="common,checkout,container,run-cowsay">}}
```

---

## Checkpoint 🎯

- Quel est l'impact en terme de temps d'exécution du changement précédent ?
- **Problème :** Le temps entre une modification et le retour est crucial

{{< figure src="/images/wait-here.jpg" >}}

---

## 🎓 Exercice : Optimiser avec les fonctionnalités du moteur de CI

- **But** : s'assurer que GitHub actions install et utilise `cowsay` le plus efficacement possible

- C'est à vous de mettre à jour le workflow pour:
  - Lire le contenu du fichier `README.md` dans un "output" (une variable temporaire de GitHub Actions)
  - Passer le contenu (via l'output) à une version de cowsay gérée par GitHub Actions

- 💡 Utilisez les GitHub Actions et documentations suivantes :
  -  [Github Action pour cowsay](https://github.com/marketplace/actions/neo-cowsay)
  -  [GitHub Action pour lire un ficher dans une variable `output`](https://github.com/juliangruber/read-file-action)
  - [Documentation de `steps.outputs`](https://docs.github.com/en/actions/learn-github-actions/contexts#steps-context)

---

## ✅ Solution : Optimiser avec les fonctionnalités du moteur de CI

```yaml
{{< snippet src="snippets/say-hello-full.yml" tags="common,checkout,gha-cowsay">}}
```

---

## 🎓 Exercice : Intégration Continue du projet "vehicle-server"

👷🏽‍♀️ C'est à vous de modifier le projet "vehicle-server" pour faire l'intégration continue!

- Nous souhaitons mettre en place un workflow qui, pour chaque commit poussé sur votre dépôt, va:
  - Récupérer le code de l'application depuis GitHub
  - Installer node dans la même version majeur que la version de GitPod
     - 💡 [Action setup-node](https://github.com/actions/setup-node)
  - L'application est compilée et le code Javascript est généré dans le répertoire `dist`

{{% small %}}
Pensez à supprimer/renommer le workflow `bonjour.yaml`
{{% /small %}}

---

## 🎓 Solution : Intégration Continue du projet "vehicle-server"

```yaml
{{< snippet src="snippets/vehicle-server.yml">}}
```

---

## 🎯 Checkpoint

- Pour chaque commit poussé dans la branche `main` du Vehicle Server,
- GitHub action vérifie que l'application est compilable et fabriquée,
- Avec un feedback (notification GitHub).

=> On peut modifier notre code avec plus de confiance !

{{% /section %}}
