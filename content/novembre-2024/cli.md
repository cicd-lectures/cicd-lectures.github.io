+++
weight = 50
+++

{{% section %}}

{{< slide template="invert" >}}

## Guide de survie en ligne de commande sous Linux

Remise à niveau / Rappels

---

## CLI?

- 🇬🇧 CLI == "Command Line Interface"
- 🇫🇷 "Interface de Ligne de Commande"

---

{{< figure src="/images/read-eval-print-loop.png" >}}

C'est un programme qui accepte une commande en entrée et retourne un resultat.
<br/>
<br/>
Nous allons utiliser `bash`

---

## Anatomie d'une commande

```bash
ls --color=always -l /bin
```

- Séparateur : l'espace
- Premier élément (`ls`) : c'est la commande
- Les éléments commençant par un tiret `-` sont des "options" et/ou drapeaux ("flags")
  - "Option" == "Optionnel"
- Les autres éléments sont des arguments  (`/bin`)
  - Nécessaire (par opposition)

---

## Manuel des commandes

```bash
man <commande> # Commande 'man' avec comme argument le nom de ladite commande
```

- Navigation avec les flèches haut et bas
- Tapez `/` puis une chaîne de texte pour chercher
- Touche `n` pour sauter d’occurrence en occurrence
- Touche `q` pour quitter

🎓 Essayez avec `ls`, cherchez le mot `color`

{{% small %}}
- 💡 La majorité des commandes fournit également une option (`--help`), un flag (`-h`)  ou un argument (`help`)
- ... en dernier recours Google c'est pratique aussi !
{{% /small %}}

---

## Raccourcis

Dans un terminal Unix/Linux/WSL :

- `CTRL + C` : Annuler le processus ou prompt en cours
- `CTRL + L` : Nettoyer le terminal
- `CTRL + A` : Positionner le curseur au début de la ligne
- `CTRL + E` : Positionner le curseur à la fin de la ligne
- `CTRL + R + mot clé` : Rechercher dans l'historique de commandes
- `Tab`: Compléter la commande

</br>
</br>

🎓 Essayez-les ! (Notamment `CTRL + R` et `Tab`)

---

## Commandes de base 1/2

- `pwd` : Afficher le répertoire courant
  - 🎓 Option `-P` ?
- `ls` : Lister le contenu du répertoire courant
  - 🎓 Options `-a` et `-l` ?
- `cd` : Changer de répertoire
  - 🎓 Sans argument : que se passe t'il ?
- `cat` : Afficher le contenu d'un fichier
  - 🎓 Essayez avec plusieurs arguments
- `mkdir` : créer un répertoire
  - 🎓 Option `-p` ?

---

## Commandes de base 2/2

- `echo` : Afficher un (des) message(s)
- `rm` : Supprimer un fichier ou dossier
- `touch` : Créer un fichier
- `grep` : Chercher un motif de texte
- `code` : Ouvre le fichier dans l'éditeur de texte

---

## Arborescence de fichiers

{{< figure src="/images/linux-directory-structure.png" width=800 >}}

---

- Le système de fichier a une structure d'arbre
  - La racine du disque dur c'est `/`
    - 🎓 `ls -l /`
  - Le séparateur c'est également `/`
    - 🎓 `ls -l /usr/bin`

---

## Chemins de l'arborescense

- Pour référencer un endroit dans l'arbre, on utilise un **chemin**
- Deux types de chemins :
  - Absolu (depuis la racine): Commence par `/` (Ex. `/usr/bin`)
  - Sinon c'est relatif (e.g. depuis le dossier courant) (Ex `./bin` ou `local/bin/`)

---

- Le dossier "courant" c'est `.`
  - 🎓 `ls -l ./bin # Dans le dossier /usr`
- Le dossier "parent" c'est `..`
  - 🎓 `ls -l ../ # Dans le dossier /usr`

---

- Tout programme possède un répertoire courant.
  - Le **Current / Process Working Directory (CWD/PWD)**
- On peut changer le répertoire courant de l'interpréteur de commande avec `cd` (change directory)

```bash
cd /usr/bin # Change le repertoire courant par /usr/bin : on se déplace dans l'arbre
```

<br>

---

🎓 Dans quel repertoire nous emmène cette succession de commandes?

```bash
cd /usr/bin
cd ../..
cd ./workspaces
```

---

- `~` (tilde) c'est un raccourci vers le dossier "home" de l'utilisateur courant
  - 🎓 `ls -l ~`
- `-` (minus) raccourci pour revenir au dernier répertoire visité (`cd -`)

---

Toutes les commandes sont sensible à la casse (majuscules/minuscules) et aux espaces

```bash
ls -l /bin
ls -l /Bin
mkdir ~/"Accent tué"
ls -d ~/Accent\ tué
ls -d ~/accent\ tue
```

---

## Un language (?)

- Support des variables

```bash
# On déclare et initialise une variable
MA_VARIABLE="Salut tout le monde"

# On l'évalue avec avec le caractère `$`
echo "${MA_VARIABLE}"
```

- Evaluation d'une sous commande

```bash
echo ">> Contenu de /tmp :\n$(ls /tmp)"
```

- Des `if`, des `for` et plein d'autres trucs {{< newtabref href="https://tldp.org/LDP/abs/html" title="(doc)" >}}

---

## Codes de sortie

- Chaque exécution de commande renvoie un code de retour (🇬🇧 "exit code")
  - Nombre entier entre 0 et 255 (en {{< newtabref href="https://en.wikipedia.org/wiki/POSIX" title="POSIX" >}})
- Ce code indique si la commande s'exécutée avec succes ou non
- Code accessible dans la variable *éphémère* `$?` :

```bash
ls /tmp
echo $?

ls /do_not_exist
echo $?

# Une seconde fois. Que se passe-t'il ?
echo $?
```

---

## Entrée, sortie standard et sortie d'erreur

{{< figure src="/images/cli-ios.png" >}}

- Un programme peut consommer des données sur son entrée standard `stdin` (fd=0)
- Un programme peut genérer des données sur sa sortie standard `stdout` (fd=1)
- Ou en cas d'erreur données sur sa sortie d'erreur `stderr` (fd=2)

---

Ces flux de données peuvent être manipulés par l'interpréteur

```bash
# Redirige stdout dans un fichier hello.txt
echo "Hello" > /tmp/hello.txt

# Redirige stdout dans le fichier /dev/null
ls -l /tmp >/dev/null
ls -l /tmp 1>/dev/null

ls -l /do_not_exist
# Redirige stdout dans le fichier /dev/null
ls -l /do_not_exist 1>/dev/null
# Redirige stderr dans le fichier /dev/null
ls -l /do_not_exist 2>/dev/null

ls -l /tmp /do_not_exist
# Redirige stdout vers /dev/null et stderr vers stdout /dev/null
ls -l /tmp /do_not_exist 1>/dev/null 2>&1
```

---

## Pipes

- Le caractère "pipe" `|` permet de chaîner des commandes
  - Le "stdout" de la première commande est branchée sur le "stdin" de la seconde

- Exemple : Afficher les fichiers/dossiers contenant le lettre `d` dans le dossier `/bin` :

```bash
ls -l /bin

ls -l /bin | grep "d" --color=auto
```

---

## Exécution de programmes

- Les commandes sont des fichier binaires exécutables
- Fichier se trouvant dans l'arborescense de fichier du système
- Pourtant nous indiquons pas de chemin quand on appelle une commande?

 🤔 Comment l'interpréteur retrouve quel fichier exécuter a partir d'un simple nom?

---


- La variable d'environnement `$PATH` liste les dossiers dans lesquels chercher les binaires
- L'interpréteur cheche le premier binaire qui porte le nom dans les répertoires contenus dans PATH

```bash
echo "${PATH}" # Affiche la valeur de PATH

command -v cat # équivalent de "which cat"

ls -l "$(command -v cat)"
```

💡 Penser a Vérifier cette variable quand une commande fraîchement installée n'est pas trouvée

---

## Checkpoint 🎯

Nous avons vu:

- Le fonctionnement de l'interpréteur de commande `bash`
- Les raccourcis utiles (`CTRL+R` et `TAB`)
- Comment sont organisés les fichiers sous Linux
- Comment manipuler les flux de données entre commandes

{{% /section %}}
