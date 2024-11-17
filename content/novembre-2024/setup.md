+++
weight = 40
+++

{{% section %}}

{{< slide template="invert" >}}

## Préparer votre environnement de travail

---

## Outils Nécessaires 🛠

- Un navigateur récent (et décent)
- Un compte sur [{{< icon familly="brands" name="github" >}} GitHub](https://github.com)
- On va vous demander de travailler en binôme, commencez à réfléchir avec qui vous souhaitez travailler !
- Enregistrez vous par [ici](https://docs.google.com/spreadsheets/d/1R1vcMQxJqAnzkSPcO0_iOtz_ICwTLDqBlUMcCyc2TWM/edit?usp=sharing)!

---

## GitPod

[GitPod.io](https://gitpod.io) : Environnement de développement dans le ☁️ "nuage"

- **But:** reproductible
- Puissance de calcul sur un serveur distant
- Éditeur de code VSCode dans le navigateur
- Gratuit pour 10h par mois (⚠️ jusqu'en Avril 2025...)
- Open-Source : vous pouvez l'héberger chez vous

---

## Démarrer avec GitPod  (1/2)🚀

1. Rendez vous sur [https://gitpod.io/login"](https://gitpod.io/login)
2. Authentifiez vous en utilisant votre compte GitHub
3. Continuez avec 10h
4. Selectionnez `VS Code Browser` comme éditeur
5. Repondez comme vous le souhaitez aux questions
6. Vous devriez atterir sur [https://gitpod.io/workspaces](https://gitpod.io/workspaces)

<br/>
<br/>

⚠️  Ne vous authentifiez pas sur Gitpod Flex (https://app.gitpod.io) ⚠️

---

## Démarrer avec GitPod  (2/2)🚀

- Pour les besoins de ce cours, vous devez autoriser GitPod à pouvoir effectuer certaines modification dans vos dépôts GitHub
- Rendez-vous sur [La page des intégrations avvec GitPod](https://gitpod.io/users/integrations)
- Éditez les permissions de la ligne "GitHub" (les 3 petits points à droits) et sélectionnez uniquement :
  - `user:email`
  - `public_repo`
  - `workflow`

---

## 💡Mais qu'est ce qu'un Workspace?

- C'est un ordinateur distant sur lequel on se connecte via le navigateur
- ⚠ Faites attention à réutiliser le même workspace tout au long de ce cours⚠
- ~⚠️  10h c'est pas beaucoup 😭~ En fait c'est 50h par défaut
- ➡️ Suspendez le workspace GitPod des que vous ne l'utilisez pas
  - Bouton bleu en bas a gauche, sélectionnez "Suspend"

---

## Démarrer votre premier Workspace

Cliquez sur le bouton ci-dessous pour démarrer un environnement GitPod personnalisé:


{{< figure src="https://gitpod.io/button/open-in-gitpod.svg" link="https://gitpod.io#https://github.com/cicd-lectures/gitpod" target="_blank" >}}

Après quelques secondes (minutes?), vous avez accès à l'environnement:

* Gauche: navigateur de fichiers ("Workspace")
* Haut: éditeur de texte ("Get Started")
* Bas: Terminal interactif
* À droite en bas: plein de popups à ignorer

---

## Checkpoint 🎯

- Vous devriez pouvoir taper la commande `whoami` dans le terminal de GitPod:
  - Retour attendu: `gitpod`

- Vous devriez pouvoir fermer le fichier "Get Started"...
  - ... et ouvrir le fichier ``.gitpod.yml``

{{% small %}}
On peut commencer !
{{% /small %}}

{{% /section %}}
