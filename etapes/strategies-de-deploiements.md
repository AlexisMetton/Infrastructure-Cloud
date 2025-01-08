---
icon: chess-king
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Stratégies de déploiements

Lorsqu'on déploie des applications conteneurisées sur un cluster Kubernetes, il est essentiel de choisir la bonne stratégie de déploiement. Voici quelques-unes des stratégies les plus courantes :

**1. Rolling Update (Mise à jour progressive) :**

Cette stratégie met à jour progressivement les instances de l'application sans temps d'arrêt. Les nouvelles versions des pods remplacent les anciennes de manière incrémentale jusqu'à ce que le déploiement soit complet.

**Exemple de configuration YAML pour un&#x20;**_**Rolling Update**_**&#x20;:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: myapp/frontend:v2
          ports:
            - containerPort: 80
```

**Explication** : La configuration spécifie que lors de la mise à jour, au maximum 1 pod sera indisponible à la fois (_maxUnavailable: 1_) et 1 pod supplémentaire peut être ajouté temporairement (_maxSurge: 1_).

**2. Blue-Green Deployment :**

Cette stratégie consiste à exécuter deux environnements, _Blue_ (l'ancienne version) et _Green_ (la nouvelle version), en parallèle. Une fois que l'environnement _Green_ est validé, le trafic est basculé de _Blue_ à _Green_, ce qui minimise le risque de défaillance.

**Exemple de déploiement Blue-Green :**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment-blue
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
      version: blue
  template:
    metadata:
      labels:
        app: backend
        version: blue
    spec:
      containers:
        - name: backend
          image: myapp/backend:v1
          ports:
            - containerPort: 3001

---

apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment-green
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
      version: green
  template:
    metadata:
      labels:
        app: backend
        version: green
    spec:
      containers:
        - name: backend
          image: myapp/backend:v2
          ports:
            - containerPort: 3001
```

**Explication** : Le trafic est initialement dirigé vers la version _Blue_. Une fois la version _Green_ prête et validée, le service est configuré pour rediriger le trafic vers _Green_.

**3. Canary Deployment :**

Le déploiement canari consiste à déployer progressivement la nouvelle version à un petit pourcentage des utilisateurs tout en observant les métriques et les performances. Si la version est stable, elle est déployée à l'ensemble des utilisateurs.

**Exemple de configuration YAML pour un déploiement Canari :**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-canary
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
      version: canary
  template:
    metadata:
      labels:
        app: frontend
        version: canary
    spec:
      containers:
        - name: frontend
          image: myapp/frontend:v3
          ports:
            - containerPort: 80
```

**Explication** : Un pod avec la version _Canary_ est déployé pour tester la nouvelle version en conditions réelles.
