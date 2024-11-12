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

##  Barème (indicatif):

- Utilisation de Git et GitHub (/5)
  - Est-ce que le Git Flow est clair?
  - Est-ce qu'il y a des PRs? Bien découpées? De la revue de code?
  -  Est-ce qu'il y à des tags et des version sémantiques?

---

- Cycle de vie (/3)
  - Est-ce que les différentes étapes de votre livraison sont claires?
  -  Est-ce qu'un outil les normalise?
- Gestion des Dépendances (/2)
  - Est-ce que vos dépendances sont récupérées de façon reproductible?

---

- Intégration Continue (/5)
  - Est-ce qu'il y à un outil de CI?
  - Que prouve votre CI?

---

- Livraison Continue (/3)
  - Est-ce que vous avez un processus de livraison clair?
  - Est-ce automatisé?
  - Est-ce que votre livrable est utilisable? Documenté?
- Tests (/2)
  - Avez vous une suite de tests automatisée? Que prouve t'elle?

{{% /section %}}

