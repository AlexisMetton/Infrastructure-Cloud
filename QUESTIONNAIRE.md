# Dev-Web-1---Evaluation---Alexis-Metton

## Questions ouvertes

### 01 - que pouvez-vous dire sur l'évolution de javascript ? Comment a-t'il changé beaucoup de choses ? Qu'en pensez-vous ?

Au début, JavaScript était uniquement utilisé pour créer du dynamisme sur des pages web. C'est encore le cas sauf qu'il est désormais utilisé aussi pour d'autres fin. Depuis quelques années, il est possible d'utiliser JavaScript pour créer des classes, faire de la programmation objet, faire de l'asynchrone, etc. Par conséquent, on a vu l'arrivée de nouveaux frameworks frontend comme ReactJs, VueJS et Angular, etc. qui ont permis de développer des sites web et des applications via JavaScript. En effet, le développement aussi des API Rest et de l'encapsulation de code pour les faire fonctionner comme des applications a rendu le développement bien souvent plus rapide et donc moins cher. La possibilité de développer des applications avec du langage du web a ouvert ce marché à d'autres développeurs. De plus, il y a aussi eu des avancées côté backend avec NodeJS qui à ouvert à JavaScript la gestion du backend qui était jusqu'alors très largement détenu par le langage PHP. Ainsi, JavaScript est devenu un langage à tout faire, en passant par du simple dynamisme sur le web à la création d'applications sans oublier la gestion de base de données.

### 02 - Selon vous, quelles bonne pratiques de développement sont attendues de la part d'un professionnel ?

Je pense essentiellement à 5 bonnes pratiques de développement pour un professionnel :
1. Faire de la veille afin de se tenir au courant des actualités, des opportunités et menaces (failles de sécurité par exemple) présentes sur le marché du développement web (ou autres selon le domaine d'expertise du professionnel). La veille peut dépasser le domaine d'expertise car il est aussi intéressant de développer une vision plus globale du développement informatique.
2. Avoir un code clair. Cela passe par une bonne hiérarchie du code et des projets (avec des dossiers, fichiers et à l'intérieur des fichiers). De plus, le nommage est aussi primordial. Le nommage doit être clair et sans ambiguïté. De préférence privilégier l'anglais (éviter le mélange des langues, ce que j'ai peut-être fait par mégarde sur ce projet même si j'essaye de privilégier l'anglais).
3. Commenter son code. J'apprécie commenter le code pour mieux clarifier la logique de mon code (cela me permet aussi de réfléchir et vérifer que mon code est cohérent et suit une logique de développement efficiente).
4. Héberger et utiliser un système de versionnage des projets réalisés. Pour ma part j'utilise Git et GitHub pour le faire. Cela permet de mieux hiérarchiser son projet et oblige à réfléchir en amont à la structure du projet et à ses potentiels modifications. Avoir l'habitude de faire facilite aussi le travail en équipe quand il existe.
5. Réaliser des tests sur son code afin de minimiser le risque d'erreur en production. On doit pouvoir avoir confiance dans la fiabilité du travail du développeur, particulièrement pour ceux qui utilise,t ses outils.

### 03 - En quoi la veille technique est importante ?

Pour répondre à la question, on peut reprendre ce que j'ai indiqué dans le premier point de la question 2. J'ajouterai qu'il est de plus en plus impérieux de réaliser une veille technique, car le développement des technologies est exponentiel. On le voit bien avec l'ia qui, très régulièrement, fait des mises à jour et qui, à chaque fois, passe un nouveau cap dans la qualité de service. C'est aussi le cas dans d'autres technologies comme le web3 qui développe même un nouveau paradigme dans notre utilisation d'internet (par rapport au web2). Par conséquent, pour ne pas être dépassé et s'adapter, il faut suivre les évolutions.

### 04 - Pouvez-vous me citer des sources d'informations relatives à la cyber sécurité ?

Les organismes d'informations officiels qui couvrent la cyber sécurité que je connais sont :
- ANSII
- OWASP
- CNIL

J'ai même réalisé il y a un an la formation sur le RGPD dispensée par la CNIL

### 05 - Pouvez-vous me décrire le principe d'une injection SQL ?

L'injection SQL est une attaque informatique qui à pour but de manipuler la base de données d'un site ou d'une application en passant par une requête SQL envoyée via un champ dans un formulaire (la plupart du temps). Ainsi, l'attaquant peut récupérer, modifier et supprimer les données de la base de données.

### 06 - Décriver ce que l'on peut mettre en place pour s'en prémunir.

On peut mettre en place des requêtes paramétrées qui permettent de séparer les valeurs de la logique de la requête. Ainsi l'injection de code ne fonctionne pas (on empêche le système d'interpréter les données comme du code). On peut aussi ajouter des vérifications avant de lancer les requêtes SQL ainsi on est sûr que les données envoyées respectent notre charte.

### 07 - Que peut-on mettre en place dans une application afin de limiter 'accès à certaines données / actions ?

On peut mettre en place des rôles utilisateurs afin d'accorder l'accès à certaines pages ou fonctionnalités à des rôles spécifiques. Cela peut se faire aussi bien sur le frontend que sur le backend. Les rôles seront souvent disponbles dans le token d'authentification.

### 08 - Plus généralement, que pouvez-vous me dire sur les besoin en sécurité d'une application ?

Voici certains besoins en sécurité d'une application :
- Prévention des vulnérabilités (Faille XSS, injection de code, etc.)
- Gestion des rôles pour donner certains accès à des rôles spécifiques.
- Gestion des données sensibles dans la base de données. Par exemple, les mots de passe ou toute identification directe de l'utilisateur doivent être hashés dans la base de données, les rendant inexploitables en cas de vol de données

### 09 - Que pouvez-vous me dire sur l'intérêt des tests ?

Pour répondre à la question, on peut reprendre ce que j'ai indiqué dans le dernier point de la question 2. Je peux ajouter que la réalisation de test, qui est considérée par certains comme une perte de temps, se voit sur le long terme comme un gain de temps énorme car il évite de nombreux bugs qui peuvent arriver quand on doit souvent modifier le code (comme ajouter des fonctionnalités). Ainsi, sur le long terme, on perd moins de temps dans la correction de bugs. 

### 10 - Pouvez-vous me citer quelques types de tests et leur destination ?

Types de tests : 
- Tests unitaires : Vérifie le bon fonctionnement de petites unités du code comme des fonctions.
- Tests fonctionnels : Vérifie que les fonctionnalités fonctionnent, comme la vérification des routes d'API par exemple.

### 11 - Que pouvez-vous dire sur le développement Orienté objet et fonctionnel ?

Ces deux développements présentent différents avantages et inconvénients.

- Développement programmation orienté objet (POO) : Organise le code en objets qui sont des instances de classes. C'est-à-dire qu'un objet va être créé selon les attributs et les méthodes définis dans une classe. Dans la POO on retrouve une forte notion d'héritage, c'est-à-dire que des classes peuvent hériter des caractéristiques d'une autre classe pour créer une nouvelle classe (appelée sous-classe). Cette nouvelle classe partage des attributs et méthodes de la classe parente tout en ajoutant ses propres attributs et méthodes.

- Développement fonctionnel : Organise le code en fonctions, c'est-à-dire que pour les mêmes arguments le résultat ne change pas. Il est plus prévisible. Le développement fonctionnel est plus adapté pour les applications qui nécessitent souvent une grande fiabilité.