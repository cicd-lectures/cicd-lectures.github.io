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
- Enregistrez vous par {{< newtabref href="https://docs.google.com/spreadsheets/d/1R1vcMQxJqAnzkSPcO0_iOtz_ICwTLDqBlUMcCyc2TWM/edit?usp=sharing" title="ici" >}}!

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

1. Rendez vous sur {{< newtabref href="https://gitpod.io/login" title="https://gitpod.io/login" >}}
2. Authentifiez vous en utilisant votre compte GitHub
3. Continuez avec 10h (Si vous le pouvez connectez votre Linked In pour avoir 50h)
4. Selectionnez `VS Code Browser` comme éditeur
5. Repondez n'importe quoi aux questions
6. Vous devriez atterir sur {{< newtabref href="https://gitpod.io/workspaces" title="https://gitpod.io/workspaces" >}}

<br/>
<br/>

⚠️  Ne vous authentifiez pas sur Gitpod Flex (https://app.gitpod.io) ⚠️  

---

## Démarrer avec GitPod  (2/2)🚀

- Pour les besoins de ce cours, vous devez autoriser GitPod à pouvoir effectuer certaines modification dans vos dépôts GitHub
- Rendez-vous sur {{< newtabref href="https://gitpod.io/users/integrations" title="la page des intégrations avec GitPod" >}}
- Éditez les permissions de la ligne "GitHub" (les 3 petits points à droits) et sélectionnez uniquement :
  - `user:email`
  - `public_repo`
  - `workflow`

---

## 💡Mais qu'est ce qu'un Workspace?

- C'est un ordinateur distant sur lequel on se connecte via le navigateur
- ⚠ Faites attention à réutiliser le même workspace tout au long de ce cours⚠
- ⚠️ 10h c'est pas beaucoup 😭
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
