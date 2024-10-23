+++
weight = 60
+++

{{% section %}}

{{< slide template="invert" >}}

## Comment fonctionnent les Internets?

{{< figure src="/images/internet-web.gif" >}}

---

🧐 Que se passe-t-il quand je tape google.com dans mon navigateur et que j'appuie sur entrée?

---

1. 📖 Resolution DNS
2. 🔌 Connection TCP
3. 🔒 Handshake TLS
4. ➡️  Envoi d'une requête HTTP au Serveur
5. ⬅️ Réception d'une reponse HTTP et décodage du contenu HTML
6. 🎨 Rendu de la page par le navigateur

---

## Zoom sur HTTP

- Hyper Text Transfer Protocol
- Défini un format de requête/réponse dans le modèle client / serveur
  - ➡️ Le client demande une ressource à un serveur via une requête HTTP,
  - ⬅️ Le serveur lui réponds une réponse avec le contenu de la ressource.

{{< figure src="/images/http_process_explained.jpg" >}}

---

## Anatomie d'une requête HTTP

Une requête est composée des champs suivant:

- **Méthode**: Indique une action désirée (`GET`, `POST`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`...)
- **Hote**: indique un domaine dans lequel récupérer les resources (`github.com`)
- **Chemin** (path): indique une ressource à obtenir au serveur (`/assets/file.js`)
- **Paramètres de requête** (query parameters): paramètres additionnels de requête apposés au path (`/pages/node?utm_source=facebook`)
- **Entêtes** (headers): Couple clé -> multiples valeurs indiquant des méta information sur la requête (`Accepted-Content`, `User-Agent`,`Accept`, `Referrer`, `Authorization`, `Cookies`)
- **Corps** (body): Optionnel, contenu encodé à envoyer au serveur, par exemple une soumission de formulaires.

---

Une réponse est composée des champs suivant:

- {{< newtabref href="https://http.cat" title="D'un status code" >}} 🐱
  - 200 OK, 404 Not Found, 301 Moved Permanently etc..
- *Entêtes* (headers): Couple clé -> multiples valeurs indiquant des méta information sur la réponse (`Content-Length`, `Content-Encoding`,`Content-Type` ...)
- *Un corps de réponse* à lire et à décoder
  - HTML, JSON ou autre...

---

## Comment parler HTTP depuis le terminal?

- On propose d'utiliser {{< newtabref href="https://curl.se/" title="cURL" >}}
- Outil pour transférer des données dans différents protocoles
  - Le couteau suisse des internets!

---

## 🎓 Exercice: Première Requête en utilisant cURL

- Que signifie cette ligne de commande?
  - Indice: `man curl`
- Pouvez expliquer le résultat affiché?

```bash
curl --verbose --location --output /dev/null voi.com
```

---

## ✅ Solution: Première Requête en utilisant cURL

- C'est verbeux 🙃, mais on l'a demandé avec `--verbose`. cURL va afficher sur la sortie standard tous les échanges effectués avec le serveur
- `--location` indique à cURL de suivre les redirections
- `--output` indique à cURL d'écrire le contenu dans répondu `/dev/null` au lieu de l'afficher sur la sortie standard

---

Regardons d'un peu plus près les logs:

```bash
# On se connecte a une IPv6... probablement celle de voi.com?
* Trying [2606:4700:20::681a:3d6]:80...
* Connected to voi.com (2606:4700:20::681a:3d6) port 80

# cURL formule la requête demandée sur HTTP.
> GET / HTTP/1.1
> Host: voi.com
> User-Agent: curl/8.4.0
> Accept: */*
>
# Le serveur nous réponds une 301 !? voi.com à bougé?
< HTTP/1.1 301 Moved Permanently
# [...]
# Aha! Le serveur nous redirige vers le même site, mais en HTTPS sur le port 443.
< Location: https://voi.com:443/
```

---

```bash
# Comme indiqué: on se reconnecte a voi.com sur le port 443!
* Clear auth, redirects to port from 80 to 443
* Issue another request to this URL: 'https://voi.com:443/'
*   Trying [2606:4700:20::681a:3d6]:443...
* Connected to voi.com (2606:4700:20::681a:3d6) port 443

# On se connecte en HTTPS, du coup il va falloir établir une session TLS
# Ensuite cURL et le serveur se mettent d'accord et établissent la connexion sécurisée.
* (304) (OUT), TLS handshake, Client hello (1):
# [...]
# On est connectés de façon sécurisée au serveur!
* SSL connection using TLSv1.3 / AEAD-CHACHA20-POLY1305-SHA256
* Server certificate:
# [...] Le certificat du serveur est valide!
*  SSL certificate verify ok.
# [...] On refait notre requête une fois connectés!
> GET / HTTP/2
> Host: voi.com
> User-Agent: curl/8.4.0
> Accept: */*
>
# Victoire le serveur nous réponds!
< HTTP/2 200
# Du HTML!
< content-type: text/html; charset=utf-8
# et 22kb de données!
{ [21877 bytes data]
```

---

- Ce qu'il viens de se passer est ce que l'on appelle une `HTTPS` upgrade
- Le serveur "force" le client a se connecter en utilisant `HTTPS` de façon sécurisée!
- Pourquoi?
  - TLS prouve que le client parle bien au bon serveur!
  - TLS chiffre les communications sur le réseau, on peut faire transiter des données sans(trop) se soucier d'être espionnés 🕵️

---

- Maintenant essayez d'enlever l'option `--location`, que se passe-t-il?
- Maintenant essayez d'enlever l'option `--output /dev/null`, que se passe-t-il?

---

## Autres Options Utiles de cURL

- Contrôle de la méthode de la requête: `--request POST`, `--request DELETE`
- Ajouter un header a la requête: `--header "Content-Type: application/json"`
- Envoyer un body dans la requête:
  - Directement depuis la ligne de commande `--data '{"some":"json"}`
  - En lisant un ficher `--data '@some/local/file'`

---

## 🎓 Exercice: Afficher du JSON de Façon Lisible

- Qu'affiche le résultat de la commande suivante?
- Comment le rendre plus lisible?
  - Indice: il faut utilser un `|` (pipe) et la commande `jq`

```bash
curl https://swapi.dev/api/planets/1
```

---

## ✅ Solution: Afficher du JSON de Façon Lisible

```bash
curl https://swapi.dev/api/planets/1 | jq .
```

Bonus: jq permets de sélectionner un attribut JSON.

```bash
curl https://swapi.dev/api/planets/1 | jq .residents
```

---

## Checkpoint 🎯

* Internet repose sur une collection de protocole (DNS, TCP, TLS, HTTP)
* HTTP permets de formuler une requête à un serveur et une réponse
* `cURL` est un outil très complet pour parler HTTP depuis un terminal!

{{% /section %}}
