+++
weight = 190
+++

{{% section %}}

{{< slide template="invert" >}}

## Évaluation du Module

---

- L'évaluation pour le cours de CI/CD sera un projet dédié
- **But**: Ecrire une CLI qui communique avec le vehicle-server pour
  - **1.**: Créér un véhicule
  - **2.**: Lister les véhicules créés
- L'addresse du serveur doit être configurable


---

Exemple d'utilisation

```bash
# Créé un véhicle
$ vehicle-cli --address=localhost:8080 create-vehicle --shortcode=abcd --battery=12 --longitude=20.0 --latitude=30.0`
Created vehicule `abcd`, with ID `34`

# Affiche les erreurs rapportées par le serveur.
$ vehicle-cli --address=localhost:8080 create-vehicle --shortcode=abcdef --battery=12 --longitude=20.0 --latitude=30.0`
Could not create the vehicle
- Shortcode must be only 4 charactes long

# Liste les véhicules
vehicle-cli --address=localhost:8080  list-vehicles
# Affiche la liste des véhicules répondu par le serveur... format libre!
```

---

- Vous avez le choix du langage et du format du livrable
  - Une image Docker c'est bien!
  - Un binaire aussi, ca sera testé sous Linux / x86_64.
- L'utilisation d'un framework pour faire des outils en CLI est recommandée
  - Voici une [liste relativement complète](https://github.com/shadawck/awesome-cli-frameworks) en fonction des langages
- Attention avec C++, je ne suis pas sur qu'il y aie des outils de gestion de dépendance.

---

##  Barème (indicatif):

- Livrable (/3):
  - Est-ce que vous avez un livrable utilisable? (Par exemple une image Docker ou un binaire)
  - Est-ce que ce livrable est associé clairement a un tag et donc un commit dans Git?
    - Dans le cas d'une image Docker, le tag de l'image doit correspondre au tag git.
  - Est-ce que le livrable est généré automatiquement quand un tag git est poussé?

---

- Fonctionalités (/2)
  - Est-ce que je peux lister les véhicules créés?
  - Est-ce que je peux créér un véhicule?
  - Est-ce que les messages d'erreur du serveur sont bien affichés?

---

- Utilisation de Git et GitHub (/5)
  - Est-ce que le Git Flow est clair?
  - Est-ce qu'il y a des PRs? Bien Documentées? De la revue de code?
  - Est-ce qu'il y à des tags dans l'historique ?

---

- Gestion des Dépendances (/3)
  - Utilisez vous un outil de gestion de dépendances?
  - Est-ce que vos dépendances sont récupérées de façon reproductible?

---

- Intégration Continue (/5)
  - Utilisez vous un outil de CI?
  - Le workflow de CI est il exécuté sur les PR?
  - Le workflow joue le lint, les tests, et le build

---

- Tests (/2)
  - Avez vous une suite de tests automatisée? Que prouve t'elle?
    - Si trop compliquée a mettre en place / pas le temps, écrivez un paragraphe dans le README décrivant comment vous vous y prendriez :) 

{{% /section %}}

